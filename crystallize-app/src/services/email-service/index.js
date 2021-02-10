const { sendEmail } = require("./utils");

const sendGiftcardConfirmation = require("./giftcard-confirmation");
const sendOrderConfirmation = require("./order-confirmation");
const sendUserMagicLink = require("./user-magic-link");

module.exports = {
  sendEmail,
  sendGiftcardConfirmation,
  sendOrderConfirmation,
  sendUserMagicLink,
};
