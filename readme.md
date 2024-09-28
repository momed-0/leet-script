# LeetCode to GitLab Auto Sync

This project automates the process of retrieving recent LeetCode submissions, fetching problem descriptions and submitted code, and committing them to a GitLab repository.

## Features

- Fetch recent LeetCode submissions.
- Retrieve the problem descriptions and submitted code for each solved problem.
- Automatically commit the problem description as a `README.md` and the submitted code to a GitLab repository.
- Skip files if they already exist in the repository.

## Technologies

- **Node.js**: The core programming language used for automation.
- **LeetCode API**: Fetches recent submissions, problem descriptions, and submitted code.
- **GitLab API**: Commits LeetCode submissions and descriptions to a GitLab repository.

## Prerequisites

- **Node.js** installed on your system.
- **GitLab API tokens** with commit access to the repository.
- **LeetCode API** 

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/leetcode-to-gitlab.git
    cd leetcode-to-gitlab
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Configure your LeetCode and GitLab API tokens:

    - login to leetcode and obtain the COOKIE from network console and save it in env variables
    - Add your **GitLab** API token and project details env variables

## Usage

To run the script, execute the following command:

```bash
node app.js <env variables>
