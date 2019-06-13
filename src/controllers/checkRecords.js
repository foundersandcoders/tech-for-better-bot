const {
  queryApplicationsByFormula,
  querySurveysByFormula,
  queryWorkshopsByFormula,
  queryById
} = require("../models/airtable/index");

const {
  sendCFNotification,
  sendCFDiscoverySignup,
  sendClientNotification,
  sendClientInvitation,
  sendClientInvitationReminder,
  sendFollowUpSurvey,
  sendClientSurveyNotification,
  sendExitFeedbackForm,
  sendSurveyReminder
} = require("../models/email/index");

const {
  createIssue,
  updateIssue,
  addLabels
} = require("../models/github/index");

const checkRecords = (req, res, next) => {
  // Airtable formula for all rows that have notification_sent unchecked
  const needsNotification = "{notification_sent} = 0";
  queryApplicationsByFormula(needsNotification)
    .then(sendNotifications)
    .catch(console.error);

  // Check for records with "send_invitation" checked, and invitation has not been sent
  // send invitation and create Github issue
  const needsInvitation = "AND({send_invitation} = 1, {issue_created} = 0)";
  queryApplicationsByFormula(needsInvitation)
    .then(sendInvitations)
    .catch(console.error);

  // Check for records with "send_invitation_reminder" checked, and invitation reminder has not been sent
  // send reminder to book into Eventbrite
  const needsInvitationReminder =
    "AND({send_invitation_reminder} = 1, {invitation_reminder_sent} = 0)";
  queryApplicationsByFormula(needsInvitationReminder)
    .then(sendInvitationReminders)
    .catch(console.error);

  // Airtable forumla to check if applicant has been invited, and issue has not yet been created
  const needsIssue = "AND({invitation_sent} = 1, {issue_created} = 0)";
  queryApplicationsByFormula(needsIssue)
    .then(createIssues)
    .catch(console.error);

  // Airtable formula for rows where applicant has attended workshop 1, but no follow-up survey has been sent
  const needsSurvey =
    "AND({attended_workshop_1} = 1, {follow_up_survey_sent} = 0)";
  queryApplicationsByFormula(needsSurvey)
    .then(sendSurvey)
    .catch(console.error);

  // Airtable formula to check for new signups for Discovery Workshops
  const newDiscoverySignup = "{notification_sent} = 0";
  queryWorkshopsByFormula(newDiscoverySignup)
    .then(updateAvailableDates)
    .catch(console.error);

  // Airtable formula to check for rows in the follow-up survey table, where the results
  // have not been added to the existing Github issue
  const newSurvey = "{added_to_issue} = 0";
  querySurveysByFormula(newSurvey)
    .then(addSurveyToIssue)
    .catch(console.error);

  // Airtable formula to check if send_survey_reminder has been checked, but a reminder to submit user research hasn't been sent
  const needsSurveyReminder =
    "AND({send_survey_reminder} = 1, {sent_survey_reminder} = 0)";
  queryApplicationsByFormula(needsSurveyReminder)
    .then(sendSurveyReminderEmail)
    .catch(console.error);

  // Airtable formula for checking if send_exit_feedback has been checked, but no exit feedback form has been sent
  const needsExitFeedback =
    "AND({send_exit_feedback} = 1, {sent_exit_feedback} = 0)";
  queryApplicationsByFormula(needsExitFeedback)
    .then(sendClientExitFeedbackForm)
    .catch(console.error);

  res.sendStatus(200);
};

const sendNotifications = records => {
  records.forEach(record => {
    sendCFNotification(record);
    sendClientNotification(record);
  });
};

const sendInvitations = records => {
  records.forEach(record => {
    sendClientInvitation(record);
    createIssue(record);
  });
};

const sendInvitationReminders = records => {
  records.forEach(record => {
    sendClientInvitationReminder(record);
  });
};

const updateAvailableDates = records => {
  if (records) {
    records.forEach(record => {
      const dates = record.fields.Date.join(", ");
      queryById(record.fields["application_id"])
        .then(application => {
          application.updateFields({
            discovery_workshop_dates: dates
          });
          sendCFDiscoverySignup(application, dates);
          record.updateFields({
            notification_sent: true
          });
        })
        .catch(console.error);
    });
  }
};

const sendSurvey = records => {
  records.forEach(record => {
    sendFollowUpSurvey(record);
    addLabels(record.fields["issue_num"], ["attended-workshop-1"]);
  });
};

const createIssues = records => {
  if (records) {
    records.forEach(record => {
      createIssue(record);
    });
  }
};

const addSurveyToIssue = records => {
  if (records) {
    records.forEach(record => {
      queryById(record.fields["application_id"])
        .then(application => {
          updateIssue(application.fields["issue_num"], record);
          addLabels(application.fields["issue_num"], ["user-research-done"]);
          application.updateFields({
            follow_up_survey_received: true
          });
          sendClientSurveyNotification(application);
        })
        .catch(console.error);
    });
  }
};

const sendSurveyReminderEmail = records => {
  records.forEach(record => {
    sendSurveyReminder(record);
  });
};

const sendClientExitFeedbackForm = records => {
  records.forEach(record => {
    sendExitFeedbackForm(record);
  });
};

module.exports = checkRecords;
