// In order to update the issues in tech-for-better-leads, the GITHUB_TOKEN must be
// set in environment variables.

const token = process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN : false
if (!token) {
  throw new Error("GITHUB_TOKEN must be set in environment variables")
}

const owner = "foundersandcoders"
const repo = "tech-for-better-leads"
const assignee = "arrested-developer"

module.exports = { token, owner, repo, assignee }
