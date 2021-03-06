const {
  email: { user, name },
  links: { discoverySignup, productOwnerAgreementUrl }
} = require("../../config");

const transporter = require("./transporter");

const sendClientInvitationReminder = record => {
  const subject = "Tech for Better";
  const html = `
  <p>Hi,</p>
  <p>We’d still love for you to come in for a discovery workshop with us! Please take a look at our available dates
  and book yourself in for one.</p>
  <p>You can bring along one guest if you like - there’s no need to make an additional booking.</p>
  <p>Please reserve your place through <a href="${discoverySignup}?prefill_Organisation=${
    record.fields["Organisation"]
  }&prefill_application_id=${record.id}&prefill_Name=${
    record.fields["Name"]
  }"> this form.</a>
  
  <p>Thanks,</p>
  <p>
  <div><b>${name}</b></div>
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
    else record.updateFields({ invitation_reminder_sent: true });
  });
};

module.exports = sendClientInvitationReminder;
