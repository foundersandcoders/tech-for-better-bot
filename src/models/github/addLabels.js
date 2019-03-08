const octokit = require("@octokit/rest")()
const {
  github: { token, owner, repo },
} = require("../../config/config")

module.exports = async function addLabel(issueNum, labels) {
  octokit.authenticate({
    type: "token",
    token,
  })
  await octokit.issues.addLabels({
    owner,
    repo,
    number: issueNum,
    labels,
  })
}
