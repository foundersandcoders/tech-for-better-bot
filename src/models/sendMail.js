const nodemailer = require('nodemailer');
const config = require('../config/email.js');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.password,
  },
});

function sendNotification(record) {
  const html = `
  <h1>💌</h1>
  <p>You have received a new Airtable response.</p>
  <a href="${config.airtable_link}">View Airtable</a>
  `;
  const mailOptions = {
    from: config.user, // sender address
    to: config.sendTo, // list of receivers
    subject: config.subject, // Subject line
    html, // body of message
  };
  // send an email
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else record.updateFields({ notification_sent: true });
  });
}

module.exports = { sendNotification };
