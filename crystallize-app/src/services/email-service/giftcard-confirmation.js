const { sendEmail, mjml2html } = require("./utils");

module.exports = async function sendGiftcardConfirmation({ email }) {
  try {
    const { html } = mjml2html(`
      <mjml>
        <mj-body>
          <mj-section>
            <mj-column>
              <mj-text>Your giftcard is succesfully ordered. You will receive it shortly.</mj-text>
              
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `);

    await sendEmail({
      to: email,
      subject: "Giftcard Order",
      html
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};
