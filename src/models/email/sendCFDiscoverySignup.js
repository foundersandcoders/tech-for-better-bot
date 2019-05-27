const {
  email: { user },
} = require("../../config")

const transporter = require("./transporter");

const sendCFDiscoverySignup = record => {
  const subject = "Discovery Workshop Signup"
  const html = `
  <style>
  p {
    max-width: 37.5em;
  }
  h1 {
    font-size: 1.8rem;
  }
  h2 {
    font-size: 1.4rem;
  }
  </style>
  <h1>New Discovery Workshop Signup 🎉</h1>
  <p><b>Name:&nbsp;</b>${record.fields["Name"]}</p>
  <p><b>Organisation:&nbsp;</b>${record.fields["Organisation"]}</p>
  <p><b>Available for these dates:&nbsp;</b>${record.fields.discovery_workshop_dates}</p>
  <p>Follow up with them up at&nbsp;<a href="mailto:${record.fields["Email"]}">${
    record.fields["Email"]}</a>, and confirm a date.</p>
  `
  const mailOptions = {
    from: user,
    to: user,
    subject,
    html,
  }
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.error(err)
    // else record.updateFields({ notification_sent: true })
  })
}

module.exports = sendCFDiscoverySignup
