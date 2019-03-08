const nodemailer = require("nodemailer")
const {
  email: { user, pass, name },
  links: { bookingUrl, productOwnerAgreementUrl },
} = require("../../config/config")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
})

const sendClientInvitation = record => {
  const subject = "Tech for Better"
  const html = `
  <p>Hello!</p>
  <p>We would love to invite you to take part in the Tech for Better programme! We will start with
  an introductory workshop for our developers to get to know you and the problems you want to solve</p>
  <p>You can book a place at one of our upcoming workshops via <a href="${bookingUrl}">Eventbrite.</a></p>
  <p>If you wish, you can bring one guest with you to our workshop - if you work as part of a team, we do ask that
  you nominate one person to act as Product Owner for the duration of the project, who should have full
  authority to make any decisions relating to the product we make with you.</p>
  <p>Please read our <a href="${productOwnerAgreementUrl}">Product Owner Agreement</a> before you attend and let me know
  if you have any questions at all.</p>
  <p>Regards,</p>
  <p>
  <div><b>${name}</b></div>
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
    else record.updateFields({ invitation_sent: true })
  })
}

module.exports = sendClientInvitation
