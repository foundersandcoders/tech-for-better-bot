const nodemailer = require("nodemailer")
const {
  email: { user, pass },
} = require("../../config")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
})

module.exports = transporter
