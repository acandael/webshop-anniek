import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

import ServiceApi from 'lib/service-api';
import { Button, Spinner } from 'ui';
import { useT } from 'lib/i18n';

function Form({ stripeClientSecret, checkoutModel, onSuccess, onError }) {
  const t = useT();
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('idle');

  const cardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (status === 'confirming') return;
    setStatus('confirming');

    try {
      if (!stripe || !elements) {
        throw new Error('Stripe not loaded');
      }

      const { customer } = checkoutModel;

      const result = await stripe.confirmCardPayment(stripeClientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${customer.firstName} ${customer.lastName}`,
            email: customer.email
          }
        }
      });

      if (result.error) {
        throw result.error;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        // Create order through the API
        const response = await ServiceApi({
          query: `
            mutation confirmStripeOrder($checkoutModel: CheckoutModelInput!, $paymentIntentId: String!) {
              paymentProviders {
                stripe {
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
            paymentIntentId: result.paymentIntent.id
          }
        });

        const { success, orderId } =
          response.data.paymentProviders.stripe.confirmOrder;

        if (success) {
          if (typeof onSuccess === 'function') {
            onSuccess(orderId);
          }
          // Redirect to the order confirmation page
          window.location.href = checkoutModel.confirmationURL.replace(
            '{crystallizeOrderId}',
            orderId
          );
        } else {
          throw new Error('Could not confirm order');
        }
      }
    } catch (error) {
      if (typeof onError === 'function') {
        onError(error);
      }
    } finally {
      setStatus('idle');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={cardElementOptions} />
      <div style={{ marginTop: 25 }}>
        <Button
          type="submit"
          state={status === 'confirming' ? 'loading' : null}
          disabled={status === 'confirming'}
        >
          {t('checkout.payNow')}
        </Button>
      </div>
    </form>
  );
}

export default function StripeWrapper({ checkoutModel, ...props }) {
  const [stripeLoader, setStripeLoader] = useState(null);
  const stripeConfig = useQuery('stripeConfig', () =>
    ServiceApi({
      query: `
      {
        paymentProviders {
          stripe {
            config
          }
        }
      }
    `
    })
  );

  useEffect(() => {
    if (stripeConfig.data && !stripeLoader) {
      setStripeLoader(
        loadStripe(
          stripeConfig.data.data.paymentProviders.stripe.config.publishableKey,
          { locale: 'en' }
        )
      );
    }
  }, [stripeConfig, stripeLoader]);

  const stripePaymentIntent = useQuery('stripePaymentIntent', () =>
    ServiceApi({
      query: `
        mutation StripePaymentIntent($checkoutModel: CheckoutModelInput!) {
          paymentProviders {
            stripe {
              createPaymentIntent(checkoutModel: $checkoutModel)
            }
          }
        }
      `,
      variables: {
        checkoutModel
      }
    })
  );

  const stripeClientSecret =
    stripePaymentIntent?.data?.data?.paymentProviders?.stripe
      ?.createPaymentIntent?.client_secret;

  if (stripeConfig.loading || !stripeLoader || !stripeClientSecret) {
    return <Spinner />;
  }

  const elementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'stripe'
    },
    fields: {
      postalCode: {
        enabled: false
      }
    }
  };

  return (
    <Elements stripe={stripeLoader} options={elementsOptions}>
      <Form
        {...props}
        checkoutModel={checkoutModel}
        stripeClientSecret={stripeClientSecret}
      />
    </Elements>
  );
}
