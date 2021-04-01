function confirmationBancontact({checkoutModel}) {
  if (paymentIntent.status === 'succeeded') {
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
        paymentIntentId: paymentIntent.id
      }
    });

    const {
      success,
      orderId
    } = response.data.paymentProviders.bancontact.confirmOrder;

    if (success) {
      onSuccess(orderId);
    } else {
      onError();
    }
  }
}