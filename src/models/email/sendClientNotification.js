const nodemailer = require("nodemailer")
const {
  email: { user, pass, name },
  links: { researchSurveyUrl, bookingUrl, productOwnerAgreementUrl },
} = require("../../config/config")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
})

const sendClientNotification = record => {
  const subject = "Thank your for your application"
  const html = `
  <p>Hello,</p>
  <p>Thank you for your application to the Tech for Better programme. We will be in touch with you soon.</p>
  <p>If you have any questions in the meantime, please don't hesitate to contact me.</p>
  <p>${name}
  <div>Course Facilitator</div>
  <div>Founders & Coders</div>
  </p>
  `
  const mailOptions = {
    from: user,
    to: record.fields["Email"],
    cc: user,
    subject,
    html,
  }
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err)
    else record.updateFields({ client_notification_sent: true })
  })
}

module.exports = sendClientNotification
