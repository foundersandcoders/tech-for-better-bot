const queryByFormula = require('../models/getRecords');
const { sendNotification } = require('../models/sendMail');

function checkRecords() {
  console.log('checking records...');
  const formula = '{notification_sent} = 0';
  queryByFormula(formula, checkRecord);
}

function checkRecord(record) {
  if (isNew(record)) {
    sendNotification(record);
  }
}

function isNew(record) {
  return !(record.fields['notification_sent'] === true);
}

module.exports = checkRecords;
