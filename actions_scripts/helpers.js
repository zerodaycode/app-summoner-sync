// Contains helper functions made to be reusable across the JS scripts
// of the notifications

/**
 * Check if the current run is a local run (e.g., with ACT).
 * @param {Object} context - GitHub Actions context object.
 * @returns {boolean} - True if running locally, false otherwise.
 */
export function ciLocalRun(context) {
    const localRun = context.payload.act;
    return (localRun !== undefined) ? localRun : false;
}

/**
 * Post a comment on the PR to notify the user.
 * @param {Object} github - GitHub API client.
 * @param {Object} context - GitHub Actions context object.
 * @param {number} prNumber - Pull request number.
 * @param {string} message - Message content to be posted.
 * @returns {Object} - The response object from the GitHub API.
 */
export async function createPrComment(github, context, prNumber, message) {
    return await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: prNumber,
        body: message,
    });
}

/**
 * Get the username of the actor from the context.
 * @param {Object} context - GitHub Actions context object.
 * @returns {string} - The username of the actor.
 * @throws {Error} - if the parsed actor text is non valid
 */
export function extractUsername(context) {
    const actor = context.actor;
    if (actor !== undefined && actor !== "")
        return actor; 
    else
        throw new Error("Unable to determine the actor (user) that triggered this deploy. Leaving...");
}

/**
 * Get the username of the actor from the context.
 * @param {Object} context - GitHub Actions context object.
 * @returns {string} - The owner of the repository.
 */
export function getRepoOwner(context) {
    const owner = context.payload.organization.login;
    if (owner !== undefined && owner !== "")
        return owner; 
    else
        throw new Error("Unable to parse the owner name of the repository. Leaving...");
}