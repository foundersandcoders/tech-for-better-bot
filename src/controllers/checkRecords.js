const {
  queryApplicationsByFormula,
  querySurveysByFormula,
} = require("../models/queryByFormula")
const queryById = require("../models/queryById")
const {
  sendCFNotification,
  sendClientNotification,
  sendFollowUpSurvey,
} = require("../models/sendMail")
const createIssue = require("../models/createIssue")
const updateIssue = require("../models/updateIssue")
const addLabels = require("../models/addLabels")

function checkRecords(req, res, next) {
  // Airtable formula for all rows that have notification_sent unchecked
  const needsNotification = "{notification_sent} = 0"
  queryApplicationsByFormula(needsNotification)
    .then(sendNotifications)
    .catch(console.error)

  // Airtable forumla to check if applicant has been invited, and issue has not yet been created
  const needsIssue = "AND({invitation_sent} = 1, {issue_created} = 0)"
  queryApplicationsByFormula(needsIssue)
    .then(createIssues)
    .catch(console.error)

  // Airtable formula for rows where applicant has attended workshop 1, but no follow-up survey has been sent
  const needsSurvey =
    "AND({attended_workshop_1} = 1, {follow_up_survey_sent} = 0)"
  queryApplicationsByFormula(needsSurvey)
    .then(sendSurvey)
    .catch(console.error)

  // Airtable formula to check for rows in the follow-up survey table, where the results
  // have not been added to the existing Github issue
  const newSurvey = "{added_to_issue} = 0"
  querySurveysByFormula(newSurvey)
    .then(addSurveyToIssue)
    .catch(console.error)
  res.sendStatus(200)
}

function sendNotifications(records) {
  records.forEach(record => {
    sendCFNotification(record)
    sendClientNotification(record)
  })
}

function sendSurvey(records) {
  records.forEach(record => {
    sendFollowUpSurvey(record)
    addLabels(record.fields["issue_num"], ["attended-workshop-1"])
  })
}

const createIssues = records => {
  if (records) {
    records.forEach(record => {
      createIssue(record)
    })
  }
}

function addSurveyToIssue(records) {
  if (records) {
    records.forEach(record => {
      queryById(record.fields["application_id"])
        .then(application => {
          updateIssue(application.fields["issue_num"], record)
          addLabels(application.fields["issue_num"], ["user-research-done"])
          application.updateFields({
            follow_up_survey_received: true,
          })
        })
        .catch(console.error)
    })
  }
}

module.exports = checkRecords
