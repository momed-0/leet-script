const makeRequest = require('../request/makeRequest');



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
  const requestBody = JSON.stringify({
        query,
        variables,
        operationName: "questionContent"
      });
  const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': requestBody.length,
        }
      };
  const endpoint = `${process.env.endpoint}`;  // Replace with your actual GraphQL endpoint
  return makeRequest.makeGRAPHQLRequest(endpoint,options,requestBody);  
     
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
    // GraphQL request payload
    const requestBody = JSON.stringify({
      query,
      variables,
      operationName,
    });

    const endpoint = `${process.env.endpoint}`;  // Replace with your actual GraphQL endpoint
    // HTTP request options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
        'Cookie': `${process.env.Cookie}`,
      },
    };
    return makeRequest.makeGRAPHQLRequest(endpoint,options,requestBody);
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

  // GraphQL request payload
  const requestBody = JSON.stringify({
    query,
    variables,
    operationName,
  });
  const endpoint = `${process.env.endpoint}`;  // Replace with your actual GraphQL endpoint
  // HTTP request options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };
    return makeRequest.makeGRAPHQLRequest(endpoint,options,requestBody);
}


module.exports = {
    getRecentSubmission,
    getSubmittedCode,
    getProblemDesc    
}