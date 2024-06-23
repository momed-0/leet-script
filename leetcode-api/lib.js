const makeRequest = require('../request/makeRequest');


function getDate(timestamp) {
    // Create a new Date object using the timestamp (multiply by 1000 because JavaScript Date expects milliseconds)
    let date = new Date(timestamp * 1000);

    // Extract various date components
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);

    // Format the date and time as desired
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
    getDate
}