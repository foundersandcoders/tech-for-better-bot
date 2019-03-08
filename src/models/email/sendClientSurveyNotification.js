const nodemailer = require("nodemailer")
const {
  email: { user, pass, name },
  links: { productOwnerAgreementUrl },
} = require("../../config")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
})

const sendClientSurveyNotification = record => {
  const subject = "User research survey"
  const html = `
  <p>Hello,</p>
  <p>Thanks for sharing the results of your user research with us.</p>
  <p>Your project has now joined our backlog ready to be selected by our developers in the
  next round of projects. Please refer to our <a href="${productOwnerAgreementUrl}">Product 
  Owner Agreement</a> if you'd like more information about our selection process.</p>
  <p>Feel free to drop me a line any time if you have any questions.</p>
  <p>Kind regards,</p>
  <p><b>${name}</b>
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
    else record.updateFields({ client_survey_notification_sent: true })
  })
}

module.exports = sendClientSurveyNotification
