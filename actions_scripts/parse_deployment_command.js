/**
 * Parse the input command of the user in the PR.
 * @param {Object} options - The options for the notification.
 * @param {Object} options.context - Context object from GitHub Actions, containing payload and environment details.
 * @param {Object} options.core module for interacting with GitHub Actions workflow commands and outputs.
*/
export default ({context, core}) => {
    const localRun = context.payload.act;
    let commentBody = context.payload.comment?.body || '';

    if (localRun)
        console.log("Setting the command as a mock since it's running locally with ACT");
    console.log(`Comment received: ${commentBody}`);

    // Initialize variables
    let environment = '';
    let project = '';
    let infra = '';

    // Parse environment
    const environmentMatch = commentBody.match(/--environment\s+([a-zA-Z0-9_-]+)/);
    if (environmentMatch) {
        environment = environmentMatch[1];
        console.log(`Environment: ${environment}`);
    } else {
        core.setFailed("No environment specified. Aborting workflow.");
        return;
    }

    // Parse project
    const projectMatch = commentBody.match(/--project\s+([a-zA-Z0-9_-]+)/);
    if (projectMatch) {
        project = projectMatch[1];
        console.log(`Project: ${project}`);
    }

    // Parse infra
    const infraMatch = commentBody.match(/--infra\s+([a-zA-Z0-9_-]+)/);
    if (infraMatch) {
        infra = infraMatch[1];
        console.log(`Infra: ${infra}`);
    }

    // Set outputs
    core.setOutput("environment", environment);
    core.setOutput("project", project);
    core.setOutput("infra", infra);
};