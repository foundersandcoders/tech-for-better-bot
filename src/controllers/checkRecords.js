const queryByFormula = require('../models/queryByFormula');
const {
  sendNotification,
  sendClientNotification,
  sendFollowUpSurvey,
} = require('../models/sendMail');
const createIssue = require('../models/createIssue');

function checkRecords(req, res, next) {
  console.log('checking records...');
  const needsNotification = '{notification_sent} = 0';
  queryByFormula(needsNotification, sendNotifications);
  const needsIssue = 'AND({invitation_sent} = 1, {issue_created} = 0)';
  queryByFormula(needsIssue, createIssue);
  const needsSurvey =
    'AND({attended_workshop_1} = 1, {follow_up_survey_sent} = 0)';
  queryByFormula(needsSurvey, sendFollowUpSurvey);
  res.sendStatus(200);
}

function sendNotifications(record) {
  if (isNew(record)) {
    sendNotification(record);
    sendClientNotification(record);
  }
}

// TODO add issue number when issue is created
// TODO when follow up survey is sent, also label issue with 'attended-workshop-1'

function isNew(record) {
  return !(record.fields['notification_sent'] === true);
}

module.exports = checkRecords;
