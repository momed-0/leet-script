const leetcode_api = require('./leetcode-api/lib');
const gitlab_api = require('./gitlab-api/lib');

main()
async function main() {
    const codeCommitActions = [];
    const readCommitActions = [];
    let recentSubmissions = await leetcode_api.getRecentSubmission();
    recentSubmissions = recentSubmissions.data.recentAcSubmissionList;
    for(const problems of recentSubmissions) {
        let content = await leetcode_api.getProblemDesc(problems.titleSlug);
        let code = await leetcode_api.getSubmittedCode(problems.id);
        let quesTopics = await leetcode_api.getQuestionTags(problems.titleSlug);
        quesTopics = quesTopics.data.question.topicTags;
        for(const topics of quesTopics) {
            codeCommitActions.push({
                action: 'create',
                file_path: `${topics.name}/${problems.titleSlug}/${problems.titleSlug}-${problems.timeStamp}.cpp`, 
                content: `${code.data.submissionDetails.code}`
            });
            readCommitActions.push({
                action: 'create',
                file_path:`${topics.name}/${problems.titleSlug}/readme.md`,
                content: `${content.data.question.content}`
            });
        }
    }
    try {
        await gitlab_api.createCommitCode(codeCommitActions);
        await gitlab_api.createCommitReadme(readCommitActions);
    } catch(error) {
        console.log('Failed commit')
        console.log(error);
    }
}

