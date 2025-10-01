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
      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(
          clientSecret
        );

        if (paymentIntent.status === 'succeeded') {
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

          const { success, orderId } =
            response.data.paymentProviders.bancontact.confirmOrder;

          if (success) {
            if (typeof onSuccess === 'function') {
              onSuccess(orderId);
            }
            // Redirect to confirmation page
            window.location.href = checkoutModel.confirmationURL.replace(
              '{crystallizeOrderId}',
              orderId
            );
          } else {
            throw new Error('Could not confirm order');
          }
        } else {
          throw new Error('Payment was not successful');
        }
      } catch (error) {
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

    if (clientSecret) {
      setStatus('confirming');
      handlePaymentReturn(clientSecret);
    }
  }, [stripe, handlePaymentReturn]);

  function handleSubmit(event) {
    event.preventDefault();

    setStatus('confirming');

    go();

    async function go() {
      if (!stripe || !elements) {
        setTimeout(go, 100);
        return;
      }

      const { customer } = checkoutModel;

      try {
        const result = await stripe.confirmBancontactPayment(
          stripeClientSecret,
          {
            payment_method: {
              billing_details: {
                name: `${customer.firstName} ${customer.lastName}`
              }
            },
            return_url: returnUrl
          }
        );

        if (result.error) {
          onError(result.error);
          setStatus('idle');
        }
        // If no error, user will be redirected to bank
      } catch (error) {
        onError(error);
        setStatus('idle');
      }
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
