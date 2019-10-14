const {
  email: { user, name },
  links: { researchSurveyUrl }
} = require("../../config");

const transporter = require("./transporter");

const sendFollowUpSurvey = record => {
  const subject = "User research survey";
  const html = `
  <p>Hi,</p>
  <p>Thank you for attending our discovery workshop. I hope you found it useful!</p>
  <p>When you have conducted your user research, please complete the 
  <a href="${researchSurveyUrl}?prefill_Email=${
    record.fields["Email"]
  }&prefill_application_id=${record.id}&prefill_Name=${
    record.fields["Name"]
  }">Tech for Better application form</a>.</p>
  <p>Once we have received your application we will keep you up to date with the selection process for your project.</p>
  <p>If you have any further questions, please don't hesitate to contact me.</p>
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
    else record.updateFields({ follow_up_survey_sent: true });
  });
};

module.exports = sendFollowUpSurvey;
