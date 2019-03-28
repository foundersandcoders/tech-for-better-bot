const {
  email: { user, name },
  links: { exitFeedbackFormUrl }
} = require("../../config");

const transporter = require("./transporter");

const sendExitFeedbackForm = record => {
  const subject = "Tech for Better feedback";
  const html = `
  <p>Hi,</p>
  <p>We would love to receive some feedback on your experience of the Tech for Better programme.</p>
  <p>When you have some time, please do fill out
  <a href="${exitFeedbackFormUrl}?prefill_Email=${
    record.fields["Email"]
  }&prefill_application_id=${record.id}&prefill_Name=${
    record.fields["Name"]
  }">this form</a> with your thoughts - it shouldn't take long at all!</p>
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
    else record.updateFields({ sent_exit_feedback: true });
  });
};

module.exports = sendExitFeedbackForm;
