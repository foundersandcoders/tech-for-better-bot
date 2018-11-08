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

function checkRecords(res) {
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
            sendNotification(record, res);
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

function sendNotification(record, res) {
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
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else record.updateFields({ notification_sent: true });
    res.sendStatus(200);
  });
}

module.exports = checkRecords;
