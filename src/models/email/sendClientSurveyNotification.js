const {
  email: { user, name },
  links: { productOwnerAgreementUrl },
} = require("../../config")

const transporter = require("./transporter")

const sendClientSurveyNotification = record => {
  const subject = "Thank you for your application"
  const html = `
  <p>Hello,</p>
  <p>Thanks for your application to the Tech for Better programme.</p>
  <p>Your application has now joined our backlog ready to be selected by our developers in the
  next round of projects.</p>
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
