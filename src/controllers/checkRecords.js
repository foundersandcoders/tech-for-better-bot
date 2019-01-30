const {
  queryApplicationsByFormula,
  querySurveysByFormula,
} = require('../models/queryByFormula');
const queryById = require('../models/queryById');
const {
  sendMeNotification,
  sendClientNotification,
  sendFollowUpSurvey,
} = require('../models/sendMail');
const createIssue = require('../models/createIssue');
const updateIssue = require('../models/updateIssue');
const addLabels = require('../models/addLabels');

function checkRecords(req, res, next) {
  // Airtable formula for all rows that have notification_sent unchecked
  const needsNotification = '{notification_sent} = 0';
  queryApplicationsByFormula(needsNotification, sendNotifications);

  // Airtable forumla to check if applicant has been invited, and issue has not yet been created
  const needsIssue = 'AND({invitation_sent} = 1, {issue_created} = 0)';
  queryApplicationsByFormula(needsIssue, createIssue);

  // Airtable formula for rows where applicant has attended workshop 1, but no follow-up survey has been sent
  const needsSurvey =
    'AND({attended_workshop_1} = 1, {follow_up_survey_sent} = 0)';
  queryApplicationsByFormula(needsSurvey, sendSurvey);

  // Airtable formula to check for rows in the follow-up survey table, where the results
  // have not been added to the existing Github issue
  const newSurvey = '{added_to_issue} = 0';
  querySurveysByFormula(newSurvey, addSurveyToIssue);
  res.sendStatus(200);
}

function sendNotifications(record) {
  sendMeNotification(record);
  sendClientNotification(record);
}

function sendSurvey(record) {
  sendFollowUpSurvey(record);
  addLabels(record.fields['issue_num'], ['attended-workshop-1']);
}

function addSurveyToIssue(record) {
  queryById(record.fields['application_id'], application => {
    updateIssue(application.fields['issue_num'], record);
    addLabels(application.fields['issue_num'], ['user-research-done']);
    application
      .updateFields({
        follow_up_survey_received: true,
      })
      .catch(console.log);
  });
}

module.exports = checkRecords;
