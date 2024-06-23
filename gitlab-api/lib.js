const makeRequest = require("../request/makeRequest")


async function createCommit(problems) {
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
  createCommit
}