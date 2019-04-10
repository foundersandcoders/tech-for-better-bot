const {
  email: { user, name }
} = require("../../config");

const transporter = require("./transporter");

const sendSurveyReminder = record => {
  const subject = "User Research reminder";
  const html = `
  <p>Hi,</p>
  <p>TESTING THIS WORKS!!! HE he</p>
  <p>Many thanks,</p>
  <p><b>${name}</b>
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
    else record.updateFields({ sent_survey_reminder: true });
  });
};

module.exports = sendSurveyReminder;
