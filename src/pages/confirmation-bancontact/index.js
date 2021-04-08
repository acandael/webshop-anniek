export { default } from 'page-components/checkout/confirmation';
import ServiceApi from 'lib/service-api';

export async function getServerSideProps({
  query: { payment_intent, checkout_model, redirect_status }
}) {
  const paymentIntent = payment_intent;
  const checkoutModel = JSON.parse(checkout_model);

  if (redirect_status === 'failed') {
    return {
      redirect: {
        permanent: false,
        destination: '/checkout?redirect_status=failed'
      }
    };
  }

  // Show a success message to your customer
  // There's a risk of the customer closing the window before callback
  // execution. Set up a webhook or plugin to listen for the
  // payment_intent.succeeded event that handles any business critical
  // post-payment actions.
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
      paymentIntentId: paymentIntent
    }
  });

  const {
    success,
    orderId
  } = response.data.paymentProviders.stripe.confirmOrder;

  if (success) {
    let confirmationURL = `/confirmation/{crystallizeOrderId}?emptyBasket`;
    return {
      redirect: {
        permanent: false,
        destination: confirmationURL.replace('{crystallizeOrderId}', orderId)
      }
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/'
    }
  };
}
