const leetcode_api = require('./leetcode-api/lib');
const gitlab_api = require('./gitlab-api/lib');

async function main() {
    let recentSubmissions = await leetcode_api.getRecentSubmission();
    recentSubmissions = recentSubmissions.data.recentAcSubmissionList;
    for(const problems of recentSubmissions) {
        let code = await leetcode_api.getSubmittedCode(problems.id);
        gitlab_api.createCommit({titleSlug: problems.titleSlug,
                                timeStamp:problems.timestamp,
                                code:code.data.submissionDetails.code })
                    .then(results => {
                        if(results.message === 'A file with this name already exists') {
                            console.log(`${problems.titleSlug}-${problems.timestamp}.cpp Already Exists`);
                        } 
                    })
                    .catch(error => {
                        console.log(`Error trying to insert into ${problems.titleSlug}`);
                        console.log(problems);
                        console.log(error);
                    });
    }
}

main()

