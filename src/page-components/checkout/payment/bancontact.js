import React, { useState, useEffect } from 'react';
import Head from 'next/head';
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
          return_url: `https://webshop-anniek-93xc5pcu2-acandael.vercel.app/confirmation-bancontact?checkout_model=${checkoutModelString}`
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
        <CardElement />
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
  const bancontactConfig = useQuery('bancontactConfig', () =>
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
  );

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
  const bancontactPaymentIntent = useQuery('stripePaymentIntent', () =>
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
  );

  const stripeClientSecret =
    bancontactPaymentIntent?.data?.data?.paymentProviders?.bancontact
      ?.createPaymentIntent?.client_secret;

  if (bancontactConfig.loading || !stripeLoader || !stripeClientSecret) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <script key="stripe-js" src="https://js.stripe.com/v3/" async />
      </Head>
      <Elements locale="en" stripe={stripeLoader}>
        <Form
          {...props}
          checkoutModel={checkoutModel}
          stripeClientSecret={stripeClientSecret}
        />
      </Elements>
    </>
  );
}
