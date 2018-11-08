let emailPass;
if (process.env.EMAIL_PASSWORD) {
  emailPass = process.env.EMAIL_PASSWORD;
} else {
  throw new Error('environment var EMAIL_PASSWORD must be set');
}

module.exports = {
  user: 'coursefacilitator@foundersandcoders.com',
  password: emailPass,
};
