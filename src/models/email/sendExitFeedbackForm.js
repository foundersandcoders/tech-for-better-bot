const {
  email: { user, name },
  links: { researchSurveyUrl }
} = require("../../config");

const transporter = require("./transporter");

const sendExitFeedbackForm = record => {
  const subject = "Tech for Better feedback";
  const html = `
  <p>Hi,</p>
  <p>TEsting that this works!!!</p>
  <div>Course Facilitator</div>
  <div>Founders & Coders</div>
  </p>
  `;
  const mailOptions = {
    from: user,
    to: record.fields["Email"],
    cc: user,
    subject,
    html
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else record.updateFields({ sent_exit_feedback: true });
  });
};

module.exports = sendExitFeedbackForm;
