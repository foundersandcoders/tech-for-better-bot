const {
  email: { user, name },
  dates: { userResearchDeadline },
  links: { researchSurveyUrl }
} = require("../../config");

const transporter = require("./transporter");

const sendSurveyReminder = record => {
  const subject = "Tech for Better user research reminder";
  const html = `
  <p>Hi there,</p>
  <p>Just a gentle reminder that the deadline for returning the results of your user research is ${userResearchDeadline
    .split("-")
    .join(" ")}. In order for your project to be up for selection by the London cohort, we'll need the results back before that date.</p>
  <p>Here's the <a href="${researchSurveyUrl}?prefill_Email=${
    record.fields["Email"]
  }&prefill_application_id=${record.id}&prefill_Name=${
    record.fields["Name"]
  }">form</a>, in case you need it again.</p>
  <p>As always, don't hesitate to ask me any questions you might have!</p>
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
