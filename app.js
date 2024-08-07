const leetcode_api = require('./leetcode-api/lib');
const gitlab_api = require('./gitlab-api/lib');

async function main() {
    let recentSubmissions = await leetcode_api.getRecentSubmission();
    recentSubmissions = recentSubmissions.data.recentAcSubmissionList;
    for(const problems of recentSubmissions) {
        let content = await leetcode_api.getProblemDesc(problems.titleSlug);
        // console.log(content.data.question.content);
        let code = await leetcode_api.getSubmittedCode(problems.id);
        gitlab_api.createCommitCode({titleSlug: problems.titleSlug,
                                timeStamp:problems.timestamp,
                                code:code.data.submissionDetails.code })
                    .then(results => {
                        if(results.message === 'A file with this name already exists') {
                            console.log(`${problems.titleSlug}-${problems.timestamp}.cpp Already Exists`);
                        } else {
                            console.log(`Created submitted Code for ${problems.titleSlug}`);
                        }
                    })
                    .catch(error => {
                        console.log(`Error trying to insert into ${problems.titleSlug}`);
                        console.log(problems);
                        console.log(error);
                    });
        gitlab_api.createCommitReadme({titleSlug: problems.titleSlug,
                                content:content.data.question.content })
                    .then(results => {
                        if(results.message === 'A file with this name already exists') {
                            console.log(`readme.md file Already Exists for ${problems.titleSlug}`);
                        } else {
                            console.log(`Description File Written for ${problems.titleSlug}`);
                        }
                    })
                    .catch(error => {
                        console.log(`Error trying to insert readme.md into ${problems.titleSlug}`);
                        console.log(problems);
                        console.log(error);
                    });
    }
}

main()

