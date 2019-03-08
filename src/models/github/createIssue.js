const octokit = require("@octokit/rest")()
const {
  github: { token, owner, repo, assignee },
} = require("../../config/config")

module.exports = async record => {
  octokit.authenticate({
    type: "token",
    token,
  })
  const title = record.fields["Organisation"]
  const body = `
  <h2>Initial Application</h2>
  <p><b>Name:&nbsp;</b>${record.fields["Name"]}</p>
  <p><b>Email:&nbsp;</b><a href="mailto:${record.fields["Email"]}">${
    record.fields["Email"]
  }</a></p>
  <p><b>Organisation:&nbsp;</b>${record.fields["Organisation"]}</p>
  <p><b>Representing:&nbsp;</b>${record.fields["Representing"]}</p>
  <p><b>Job Title:&nbsp;</b>${record.fields["Job Title"]}</p>
  <p><b>Worked on digital project:&nbsp;</b>${
    record.fields["Worked on digital project?"]
  }</p>
  <p><b>Experience of Agile:&nbsp;</b>${record.fields["Experience"]}</p>
  <p><b>Product owner:&nbsp;</b>${record.fields["Product owner"]}</p>
  <p><b>Availability:&nbsp;</b>${record.fields["Availibility"]}</p>
  <p><b>User needs:</b></p>
  <p>${record.fields["User needs"]}</p>
  <p><b>History:</b></p>
  <p>${record.fields["History"]}</p>
  <p><b>Market research:</b></p>
  <p>${record.fields["Market research"]}</p>
  <p><b>Inspiration / Examples:</b></p>
  <p>${record.fields["Inspiration/Examples"]}</p>
  <p><b>Why:</b></p>
  <p>${record.fields["Why"]}</p>
  `
  const labels = ["application-received"]
  const result = await octokit.issues.create({
    owner,
    repo,
    assignee,
    title,
    body,
    labels,
  })
  record.updateFields({ issue_created: true, issue_num: result.data.number })
}
