import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

import ServiceApi from 'lib/service-api';
import { Button, Spinner } from 'ui';
import { useT } from 'lib/i18n';

function Form({ stripeClientSecret, checkoutModel, onError }) {
  const t = useT();
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('idle');

  const checkoutModelString = JSON.stringify(checkoutModel);

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

      await stripe
        .confirmBancontactPayment(stripeClientSecret, {
          payment_method: {
            billing_details: {
              name: `${customer.firstName} ${customer.lastName}`
            }
          },
          return_url: `${process.env.NEXT_PUBLIC_BANCONTACT_RETURN_URL}?checkout_model=${checkoutModelString}`
        })
        .then((response) => {
          if (response.error) {
            onError();
          }
        });
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
          {t('checkout.payNow')}
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

  const stripeClientSecret =
    bancontactPaymentIntent?.data?.data?.paymentProviders?.bancontact
      ?.createPaymentIntent?.client_secret;

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
        />
      </Elements>
    </>
  );
}
