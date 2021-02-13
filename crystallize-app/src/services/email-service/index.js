const { sendEmail } = require("./utils");

const sendGiftCardConfirmation = require("./giftcard-confirmation");
const sendOrderConfirmation = require("./order-confirmation");
const sendUserMagicLink = require("./user-magic-link");

module.exports = {
  sendEmail,
  sendGiftCardConfirmation,
  sendOrderConfirmation,
  sendUserMagicLink,
};
