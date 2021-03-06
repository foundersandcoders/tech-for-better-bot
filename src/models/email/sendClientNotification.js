const {
  email: { user, name },
} = require("../../config")

const transporter = require("./transporter")

const sendClientNotification = record => {
  const subject = "Thank you for your expression of interest"
  const html = `
  <p>Hello,</p>
  <p>Thank you for your expression of interest in the Tech for Better programme. We will be in touch with you soon.</p>
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
