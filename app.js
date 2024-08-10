const leetcode_api = require('./leetcode-api/lib');
const gitlab_api = require('./gitlab-api/lib');

main()
async function main() {
    let recentSubmissions = await leetcode_api.getRecentSubmission();
    recentSubmissions = recentSubmissions.data.recentAcSubmissionList;
    for(const problems of recentSubmissions) {
        let content = await leetcode_api.getProblemDesc(problems.titleSlug);
        // console.log(content.data.question.content);
        let code = await leetcode_api.getSubmittedCode(problems.id);
        let quesTopics = await leetcode_api.getQuestionTags(problems.titleSlug);
        quesTopics = quesTopics.data.question.topicTags;
        for(const topics of quesTopics) {
            try{
                let codeCommit = await gitlab_api.createCommitCode(
                                {titleSlug: problems.titleSlug,
                                    topic: topics.name ,
                                    timeStamp:problems.timestamp,
                                    code:code.data.submissionDetails.code });
                let readmeCommit = await gitlab_api.createCommitReadme({titleSlug: problems.titleSlug,
                    topic: topics.name ,
                    content:content.data.question.content });
                //if(codeCommit.message === 'A file with this name already exists' || readmeCommit.message === 'A file with this name already exists')
            } catch(error) {
                console.log(`Error trying to commit for ${topics.name}/${problems.titleSlug}`)
                console.log(problems);
                console.log(code);
                console.log(quesTopics);
            }
        }
    }
}

