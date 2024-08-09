const makeRequest = require('../request/makeRequest');


async function buildGraphQL(query, variables,operationName) {
  const requestBody = JSON.stringify({
        query,
        variables,
        operationName
      });
  const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      };
      const endpoint = `${process.env.endpoint}`;
      return makeRequest.makeGRAPHQLRequest(endpoint,options,requestBody); 
    }

async function getQuestionTags(titleSlug) {
    const query = `
          query singleQuestionTopicTags($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          topicTags {
            name
            slug
          }
        }
      }
      `;
    const variables = {
        titleSlug: `${titleSlug}`
      };
    const operationName = 'singleQuestionTopicTags';
    return buildGraphQL(query, variables, operationName);
}



async function getProblemDesc(titleSlug) {
  const query = `
          query questionContent($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          content
          mysqlSchemas
          dataSchemas
        }
      }
      `;
  const variables = {
        titleSlug: `${titleSlug}`
      };
  const operationName = 'questionContent';
  return buildGraphQL(query,variables,operationName);
}


async function getSubmittedCode(submissionId) {
    // GraphQL query and variables
    const query = `
    query submissionDetails($submissionId: Int!) {
      submissionDetails(submissionId: $submissionId) {
        code
      }
    }
    `;
    const variables = {
      submissionId: parseInt(submissionId),
    };
    const operationName = 'submissionDetails';
    return buildGraphQL(query,variables,operationName);
} 

async function getRecentSubmission() {
    
  const query = `
        query recentAcSubmissions($username: String!, $limit: Int!) {
          recentAcSubmissionList(username: $username, limit: $limit) {
            id
            title
            titleSlug
            timestamp
          }
        }
      `;
  const variables = {
    username: `${process.env.username}`,
    limit: 20,
  };
  const operationName = 'recentAcSubmissions';
  return buildGraphQL(query,variables,operationName);
}


module.exports = {
    getRecentSubmission,
    getSubmittedCode,
    getProblemDesc    
}