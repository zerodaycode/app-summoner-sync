import { ciLocalRun, getRepoOwner } from "./helpers.js";

/**
 * Takes the previous posted message as a comment on the PR that triggered
 * the deploy command in order to add it the status of the deployment to
 * that message
 */
export default async (github, context, steps) => {
    const isLocalRun = ciLocalRun(context);

    const repoOwner = getRepoOwner(context);
    const targetRepo = steps.parse_command.outputs.project;
    
    const previousPrComment = JSON.parse(steps.notify_user.outputs.result);
    const commentId = previousPrComment.id;
    const runUrl = `https://github.com/${repoOwner}/${targetRepo}/actions`;
    
    const workflowExecution = JSON.parse(steps.trigger_deployment_workflow.outputs.result);
    const statusIcon = workflowExecution.status === 'OK' ? '✅' : '❌';
    const statusMsg = workflowExecution.details;

    const previousMsgData = previousPrComment.message;
    const message = `${previousMsgData}\n${statusIcon} Deployment ${statusMsg}. [View Workflow](${runUrl})`;
    console.log(`Message: ${message}`);

    if (!isLocalRun) {
        await github.rest.issues.updateComment({
            owner: repoOwner,
            repo: context.repo.repo,
            id: commentId,
            body: message,
        });
    }
}