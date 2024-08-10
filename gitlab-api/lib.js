const makeRequest = require("../request/makeRequest")

async function createCommitReadme(action) {
  const data = JSON.stringify({
    branch: 'main',
    commit_message: `Created Readme.md`,
    actions: action
  });
  const options = {
    hostname: 'gitlab.com',
    path: `/api/v4/projects/${process.env.gitlabProjectID}/repository/commits`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'PRIVATE-TOKEN': process.env.gitlabUserToken
  }
  };
  return await makeRequest.makeRESTAPIRequest(options,data);
}
async function createCommitCode(action) {
  const data = JSON.stringify({
    branch: 'main',
    commit_message: `Created Code`,
    actions: action
});
  const options = {
    hostname: 'gitlab.com',
    path: `/api/v4/projects/${process.env.gitlabProjectID}/repository/commits`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'PRIVATE-TOKEN': process.env.gitlabUserToken
  }
  };
  return await makeRequest.makeRESTAPIRequest(options,data);
}


module.exports = {
  createCommitCode,
  createCommitReadme
}