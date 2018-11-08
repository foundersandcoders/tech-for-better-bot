const queryByFormula = require('../models/queryByFormula');
const {
  sendNotification,
  sendClientNotification,
} = require('../models/sendMail');

function checkRecords(req, res, next) {
  console.log('checking records...');
  const formula = '{notification_sent} = 0';
  queryByFormula(formula, checkRecord);
  res.sendStatus(200);
}

function checkRecord(record) {
  if (isNew(record)) {
    sendNotification(record);
    sendClientNotification(record);
  }
}

function isNew(record) {
  return !(record.fields['notification_sent'] === true);
}

module.exports = checkRecords;
