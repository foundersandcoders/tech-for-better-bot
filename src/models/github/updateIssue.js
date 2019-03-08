const octokit = require("@octokit/rest")()
const {
  github: { token, owner, repo },
} = require("../../config/config")

module.exports = async (number, record) => {
  octokit.authenticate({
    type: "token",
    token,
  })
  const body = `
  <h2>User Research Survey</h2>
  <p><b>Accurate assumptions:</b></p>
  <p>${record.fields["Accurate assumptions"]}</p>
  <p><b>Inaccurate assumptions:</b></p>
  <p>${record.fields["Inaccurate assumptions"]}</p>
  <p><b>Things your user is trying to do:</b></p>
  <p>${record.fields["Things your user is trying to do:"]}</p>
  <p><b>Ways your user wants to feel:</b></p>
  <p>${record.fields["Ways your user wants to feel:"]}</p>
  <p><b>Summary statement:</b></p>
  <p>${record.fields["Summary statement"]}</p>
  `
  await octokit.issues.createComment({
    owner,
    repo,
    number,
    body,
  })
  record.updateFields({ added_to_issue: true }).catch(console.log)
}
