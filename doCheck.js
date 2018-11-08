if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const nodemailer = require('nodemailer');
const config = require('./config');

const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: config.airtable_api_key,
});
var base = Airtable.base(config.airtable);

function checkRecords() {
  console.log('checking records...');
  base(config.base)
    .select({
      // Selecting the first 3 records in All Responses:
      maxRecords: 1200,
      pageSize: 100,
      view: config.view,
      filterByFormula: '{notification_sent} = 0',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          if (isNew(record)) {
            sendNotification(record);
          }
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
}

function isNew(record) {
  return !(record.fields['notification_sent'] === true);
}

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
  <p>You have received a new application for Tech For Better</p>
  <a href="${config.airtable_link}">View Airtable</a>
  `;
  const mailOptions = {
    from: 'coursefacilitator@foundersandcoders.com', // sender address
    to: 'coursefacilitator@foundersandcoders.com', // list of receivers
    subject: 'New Tech For Better Application 🎉', // Subject line
    html, // body of message
  };
  // send an email
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else record.updateFields({ notification_sent: true });
    //console.log(info);
  });
}

module.exports = checkRecords;
