const { sendEmail, mjml2html } = require("./utils");

module.exports = async function sendGiftCard({ email, aanbieder, question = null, message, amount }) {
  console.log(aanbieder)
  try {
    const { html } = mjml2html(`
    <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>Hi there! Simply follow the link below to login.</mj-text>
          <mj-button href="${email}" align="left">Click here to login</mj-button>
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
