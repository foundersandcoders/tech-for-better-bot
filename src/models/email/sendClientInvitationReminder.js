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

const sendClientInvitationReminder = record => {
  const subject = "Tech for Better"
  const html = `
  <p>Hi,</p>
  <p>We’d still love for you to come in for a discovery workshop with us! Please take a look at our available dates 
  and book yourself in for one.</p>
  <p>You can bring along one guest if you like - there’s no need to book additional tickets.</p>
  <p>Please reserve your place on our <a href="${bookingUrl}">Eventbrite booking page</a>
  <p>Before your workshop, please take a look at our <a href="${productOwnerAgreementUrl}">Product Owner Agreement</a>
   and please do let me know if you have any questions at all.</p>
  <p>Thanks,</p>
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
    else record.updateFields({ invitation_reminder_sent: true })
  })
}

module.exports = sendClientInvitationReminder
