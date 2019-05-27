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
  <p><b>Email:&nbsp;</b><a href="mailto:${record.fields["Email"]}">${
    record.fields["Email"]
  }</a></p>
  <p><b>Organisation:&nbsp;</b>${record.fields["Organisation"]}</p>
  <p><b>They have said they're available for these dates:&nbsp;</b>${record.fields.discovery_workshop_dates}</p>
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
