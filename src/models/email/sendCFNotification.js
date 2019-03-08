const nodemailer = require("nodemailer")
const {
  email: { user, pass },
} = require("../../config/config")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
})

const sendCFNotification = record => {
  const subject = "New Tech for Better Application 💌"
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
  <h1>New Application Received 🎉</h1>
  <p><b>Name:&nbsp;</b>${record.fields["Name"]}</p>
  <p><b>Email:&nbsp;</b><a href="mailto:${record.fields["Email"]}">${
    record.fields["Email"]
  }</a></p>
  <p><b>Organisation:&nbsp;</b>${record.fields["Organisation"]}</p>
  <p><b>Representing:&nbsp;</b>${record.fields["Representing"]}</p>
  <p><b>Job Title:&nbsp;</b>${record.fields["Job Title"]}</p>
  <p><b>Worked on digital project:&nbsp;</b>${
    record.fields["Worked on digital project?"]
  }</p>
  <p><b>Experience of Agile:&nbsp;</b>${record.fields["Experience"]}</p>
  <p><b>Product owner:&nbsp;</b>${record.fields["Product owner"]}</p>
  <p><b>Availability:&nbsp;</b>${record.fields["Availibility"]}</p>
  <p><b>User needs:</b></p>
  <p>${record.fields["User needs"]}</p>
  <p><b>History:</b></p>
  <p>${record.fields["History"]}</p>
  <p><b>Market research:</b></p>
  <p>${record.fields["Market research"]}</p>
  <p><b>Inspiration / Examples:</b></p>
  <p>${record.fields["Inspiration/Examples"]}</p>
  <p><b>Why:</b></p>
  <p>${record.fields["Why"]}</p>
  `
  const mailOptions = {
    from: user,
    to: user,
    subject,
    html,
  }
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.error(err)
    else record.updateFields({ notification_sent: true })
  })
}

module.exports = sendCFNotification
