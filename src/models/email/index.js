const sendCFNotification = require("./sendCFNotification");
const sendClientNotification = require("./sendClientNotification");
const sendClientInvitation = require("./sendClientInvitation");
const sendClientInvitationReminder = require("./sendClientInvitationReminder");
const sendFollowUpSurvey = require("./sendFollowUpSurvey");
const sendClientSurveyNotification = require("./sendClientSurveyNotification");
const sendExitFeedbackForm = require("./sendExitFeedbackForm");
const sendSurveyReminder = require("./sendSurveyReminder")
const sendCFDiscoverySignup = require("./sendCFDiscoverySignup");

module.exports = {
  sendCFNotification,
  sendClientNotification,
  sendClientInvitation,
  sendClientInvitationReminder,
  sendFollowUpSurvey,
  sendClientSurveyNotification,
  sendExitFeedbackForm,
  sendSurveyReminder,
  sendCFDiscoverySignup
};
