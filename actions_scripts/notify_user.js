import { ciLocalRun, extractUsername, createPrComment } from "./helpers.js";

/**
 * Notify the user about the deployment action.
 * @param {Object} options - The options for the notification.
 * @param {Object} options.github - GitHub API client provided by actions/github-script.
 * @param {Object} options.context - Context object from GitHub Actions, containing payload and environment details.
 * @param {Object} options.core - Core object from GitHub Actions, containing actions to perform over the workflow.
 * @param {string} options.environment - Deployment environment (e.g., pre, prod).
 * @param {string} options.project - Project name associated with the deployment.
 * @param {string} options.infra - Infrastructure type (e.g., postgres, redis).
 * @returns {Object} - An object containing the comment ID and the message content.
 */
export default async (options) => {
  const { github, context, core, environment, project, infra } = options;

  const isLocalRun = ciLocalRun(context);

  const username = extractUsername(context);
  const prNumber = context.payload.issue.number;
  const message = generatePrCommentMsg(username, environment, project, infra);

  if (isLocalRun) {
    logMessageOnLocalEnv(message);
    // Return a mock comment ID for local testing purposes.
    return { id: 1010101010, message: message };
  } else {
    try {
      const comment = await createPrComment(github, context, prNumber, message);
      return { id: comment.data.id, message: message };
    } catch (ex) {
      core.setFailed("Failed to POST the comment on the PR to notify the user due to =[> " + ex + "]");
    }
  }
};

// Helper function to generate the PR comment message.
/**
 * Generate the content of the PR comment to notify the user.
 * @param {string} username - Username of the actor triggering the workflow.
 * @param {string} environment - Deployment environment (e.g., pre, pre-pro, pro).
 * @param {string} project - Project name associated with the deployment.
 * @param {string} infra - Infrastructure entity (e.g., postgres, redis).
 * @returns {string} - The formatted message to be posted on the PR.
 */
function generatePrCommentMsg(username, environment, project, infra) {
  let message = `🚀 Deployment action request received from user: ${username}\n`;
  
  if (project)
    message += `- Project: \`${project}\`\n`;
  if (environment)
    message += `- Environment: \`${environment}\`\n`;
  if (infra)
    message += `- Infrastructure: \`${infra}\`\n`;

  return message;
}

// Helper function to log the PR comment message in a local environment.
/**
 * Log the message locally for debugging when running with ACT.
 * @param {string} message - Message content to be logged.
 */
function logMessageOnLocalEnv(message) {
  console.log(`Action is being runned locally by 'ACT'. 
    Skipping the REST request to post a message for notifying the user on PR, but the output would have been:
    ${message}`);
}
