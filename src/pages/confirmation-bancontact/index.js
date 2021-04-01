export { default } from 'page-components/checkout/payment/bancontact';


export async function confirmationBancontact({ query: { payment_intent, checkout_model } }) {
  const paymentIntent = payment_intent
  const checkoutModel = checkout_model
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
      paymentIntentId: paymentIntent.id
    }
  });
  return {
    response
  };
}
