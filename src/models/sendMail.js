const nodemailer = require("nodemailer")
const {
  email: { user, pass, name },
  links: { researchSurveyUrl, bookingUrl, productOwnerAgreementUrl },
} = require("../config/config")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
})

function sendCFNotification(record) {
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
    to: "coursefacilitator@foundersandcoders.com",
    subject,
    html,
  }
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.error(err)
    else record.updateFields({ notification_sent: true })
  })
}

function sendClientNotification(record) {
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

function sendFollowUpSurvey(record) {
  const subject = "User research survey"
  const html = `
  <p>Hi,</p>
  <p>Thank you for attending our discovery workshop. I hope you found it useful!</p>
  <p>When you have conducted your user research, please fill in the 
  <a href="${researchSurveyUrl}?prefill_Email=${
    record.fields["Email"]
  }&prefill_application_id=${record.id}&prefill_Name=${
    record.fields["Name"]
  }">form</a> with what you have
  learned.</p>
  <p>When we have received your survey response, we will invite you to the next Definition
  workshop.</p>
  <p>If you have any further questions, please don't hesitate to contact me.</p>
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
    else record.updateFields({ follow_up_survey_sent: true })
  })
}

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

module.exports = {
  sendCFNotification,
  sendClientNotification,
  sendClientInvitation,
  sendClientInvitationReminder,
  sendFollowUpSurvey,
  sendClientSurveyNotification,
}
