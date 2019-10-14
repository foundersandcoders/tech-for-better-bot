const {
  email: { user, name },
  links: { discoverySignup, productOwnerAgreementUrl }
} = require("../../config");

const transporter = require("./transporter");

const sendClientInvitation = record => {
  const subject = "Tech for Better";
  const html = `
  <p>Hello!</p>
  <p>We would love to invite you to take part in an introductory Discovery Workshop! 
This is a two hour workshop that you will complete with a team of developers 
where you will define your challenges, describe your users, and identify their needs.
If you wish, you can bring one guest with you to our workshop.</p>

<p>This is the first step of Tech for Better, after which you can apply to the full programme.</p>

  <p>You can book your place on one of our upcoming workshops via



   <a href="${discoverySignup}?prefill_Organisation=${
    record.fields["Organisation"]
  }&prefill_application_id=${record.id}&prefill_Name=${
    record.fields["Name"]
  }"> this form.</a>

  </p>
  <p>Regards,</p>
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
    else record.updateFields({ invitation_sent: true });
  });
};

module.exports = sendClientInvitation;
