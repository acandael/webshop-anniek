import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

import ServiceApi from 'lib/service-api';
import { Button, Spinner } from 'ui';
import { useT } from 'lib/i18n';

function Form({
  stripeClientSecret,
  checkoutModel,
  onError,
  onSuccess,
  returnUrl
}) {
  const t = useT();
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('idle');

  const handlePaymentReturn = useCallback(
    async (clientSecret) => {
      console.log(
        'Bancontact: handlePaymentReturn called with clientSecret:',
        clientSecret
      );
      try {
        console.log('Bancontact: Retrieving payment intent from Stripe...');
        const { paymentIntent } = await stripe.retrievePaymentIntent(
          clientSecret
        );

        console.log('Bancontact: Payment intent retrieved:', {
          id: paymentIntent.id,
          status: paymentIntent.status
        });

        if (paymentIntent.status === 'succeeded') {
          console.log(
            'Bancontact: Payment succeeded! Calling confirmOrder mutation...'
          );
          // Confirm order with backend
          const response = await ServiceApi({
            query: `
            mutation confirmBancontactOrder($checkoutModel: CheckoutModelInput!, $paymentIntentId: String!) {
              paymentProviders {
                bancontact {
                  confirmOrder(checkoutModel: $checkoutModel, paymentIntentId: $paymentIntentId) {
                    success
                    orderId
                  }
                }
              }
            }
          `,
            variables: {
              checkoutModel,
              paymentIntentId: paymentIntent.id
            }
          });

          console.log('Bancontact: confirmOrder response:', response);

          const { success, orderId } =
            response.data.paymentProviders.bancontact.confirmOrder;

          console.log('Bancontact: Order confirmation result:', {
            success,
            orderId
          });

          if (success) {
            if (typeof onSuccess === 'function') {
              onSuccess(orderId);
            }
            // Redirect to confirmation page
            const confirmationUrl = checkoutModel.confirmationURL.replace(
              '{crystallizeOrderId}',
              orderId
            );
            console.log('Bancontact: Redirecting to:', confirmationUrl);
            window.location.href = confirmationUrl;
          } else {
            throw new Error('Could not confirm order');
          }
        } else {
          throw new Error(
            `Payment was not successful. Status: ${paymentIntent.status}`
          );
        }
      } catch (error) {
        console.error('Bancontact: Error in handlePaymentReturn:', error);
        if (typeof onError === 'function') {
          onError(error);
        }
        setStatus('idle');
      }
    },
    [stripe, checkoutModel, onSuccess, onError]
  );

  // Check if user is returning from bank redirect
  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    console.log('Bancontact: Checking for return from bank redirect');
    console.log('Bancontact: URL search params:', window.location.search);
    console.log(
      'Bancontact: Client secret found:',
      clientSecret ? 'YES' : 'NO'
    );

    if (clientSecret) {
      console.log('Bancontact: Starting order confirmation...');
      setStatus('confirming');
      handlePaymentReturn(clientSecret);
    }
  }, [stripe, handlePaymentReturn]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!returnUrl) {
      console.error('Return URL is not set');
      onError(new Error('Return URL is not configured'));
      return;
    }

    if (status === 'confirming') return;
    setStatus('confirming');

    try {
      if (!stripe || !elements) {
        throw new Error('Stripe not loaded');
      }

      const { customer } = checkoutModel;

      // Save checkout state to sessionStorage before redirect
      if (typeof window !== 'undefined') {
        const checkoutState = {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.addresses?.[0]?.email,
          street: customer.addresses?.[1]?.street,
          streetNumber: customer.addresses?.[1]?.streetNumber,
          postalCode: customer.addresses?.[1]?.postalCode,
          city: customer.addresses?.[1]?.city
        };
        sessionStorage.setItem(
          'bancontactCheckoutState',
          JSON.stringify(checkoutState)
        );
        console.log('Bancontact: Saved checkout state to sessionStorage');
      }

      console.log('Confirming Bancontact payment with return URL:', returnUrl);

      const result = await stripe.confirmBancontactPayment(stripeClientSecret, {
        payment_method: {
          billing_details: {
            name: `${customer.firstName} ${customer.lastName}`
          }
        },
        return_url: returnUrl
      });

      if (result.error) {
        console.error('Bancontact payment error:', result.error);
        onError(result.error);
        setStatus('idle');
      }
      // If no error, user will be redirected to bank
    } catch (error) {
      console.error('Bancontact payment exception:', error);
      onError(error);
      setStatus('idle');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: 25 }}>
        <Button
          type="submit"
          state={status === 'confirming' ? 'loading' : null}
          disabled={status === 'confirming'}
        >
          {status === 'confirming' &&
          new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
          )
            ? t('checkout.processing')
            : t('checkout.payNow')}
        </Button>
      </div>
    </form>
  );
}

export default function StripeWrapper({ checkoutModel, ...props }) {
  const [stripeLoader, setStripeLoader] = useState(null);
  const bancontactConfig = useQuery({
    queryKey: ['bancontactConfig'],
    queryFn: () =>
      ServiceApi({
        query: `
      {
        paymentProviders {
          bancontact {
            config
          }
        }
      }
    `
      })
  });

  useEffect(() => {
    if (bancontactConfig.data && !stripeLoader) {
      setStripeLoader(
        loadStripe(
          bancontactConfig.data.data.paymentProviders.bancontact.config
            .publishableKey
        )
      );
    }
  }, [bancontactConfig, stripeLoader]);

  // Get new paymentIntent
  const bancontactPaymentIntent = useQuery({
    queryKey: ['bancontactPaymentIntent', checkoutModel],
    queryFn: () =>
      ServiceApi({
        query: `
        mutation BancontactPaymentIntent($checkoutModel: CheckoutModelInput!) {
          paymentProviders {
            bancontact {
              createPaymentIntent(checkoutModel: $checkoutModel)
            }
          }
        }
      `,
        variables: {
          checkoutModel
        }
      })
  });

  const paymentIntentData =
    bancontactPaymentIntent?.data?.data?.paymentProviders?.bancontact
      ?.createPaymentIntent;

  const stripeClientSecret = paymentIntentData?.client_secret;
  // Construct the return URL - user should come back to checkout page after bank redirect
  const returnUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}${
          window.location.search ? window.location.search + '&' : '?'
        }`
      : '';

  if (bancontactConfig.isLoading || !stripeLoader || !stripeClientSecret) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <script key="stripe-js" src="https://js.stripe.com/v3/" async />
      </Head>
      <Elements stripe={stripeLoader} options={{ locale: 'en' }}>
        <Form
          {...props}
          checkoutModel={checkoutModel}
          stripeClientSecret={stripeClientSecret}
          returnUrl={returnUrl}
        />
      </Elements>
    </>
  );
}
