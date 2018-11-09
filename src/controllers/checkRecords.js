const queryByFormula = require('../models/queryByFormula');
const {
  sendNotification,
  sendClientNotification,
} = require('../models/sendMail');
const createIssue = require('../models/createIssue');

function checkRecords(req, res, next) {
  console.log('checking records...');
  const needsNotification = '{notification_sent} = 0';
  queryByFormula(needsNotification, checkRecord);
  const needsIssue = 'AND({invitation_sent} = 1, {issue_created} = 0)';
  queryByFormula(needsIssue, createIssue);
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
