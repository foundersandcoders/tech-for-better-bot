const octokit = require('@octokit/rest')();
const { token, org, repo } = require('../config/github');

module.exports = async function addLabel(issueNum, labels) {
  octokit.authenticate({
    type: 'token',
    token,
  });
  const result = await octokit.issues.addLabels({
    owner: org,
    repo,
    number: issueNum,
    labels,
  });
  console.log(result);
};
