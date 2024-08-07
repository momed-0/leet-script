const makeRequest = require("../request/makeRequest")

async function createCommitReadme(problems) {
  const data = JSON.stringify({
    branch: 'main',
    commit_message: `Created Readme.md for ${problems.titleSlug}`,
    actions: [
      {
        action: 'create',
        file_path:`${problems.titleSlug}/readme.md`,
        content: `${problems.content}`
      }
    ]
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
async function createCommitCode(problems) {
  const data = JSON.stringify({
    branch: 'main',
    commit_message: `Created ${problems.titleSlug} folder`,
    actions: [
        {
            action: 'create',
            file_path: `${problems.titleSlug}/${problems.titleSlug}-${problems.timeStamp}.cpp`, 
            content: `${problems.code}`
        }
    ]
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