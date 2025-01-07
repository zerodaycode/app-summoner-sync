import { ciLocalRun, createPrComment } from "./helpers.js";

/**
 * Generates a new comment on the PR that triggered the workflow with the
 * report of the tests runned by 'JEST' over the actions scripts
 */
export default async (github, context, steps) => {
    const isLocalRun = ciLocalRun(context);
    const prNumber = context.payload.number;
    
    const marker = 'to show where the warning was created)';
    const output = steps.run_tests.outputs.tests_report;
    const sanitized = output.split(marker);
    
    let msg = (sanitized.length > 1) ? sanitized[1] : sanitized[0];

    const stylizedMsg = getTitleMsg() + formatTestOutput(msg);

    if (!isLocalRun && sanitized.length >= 1) {
        createPrComment(github, context, prNumber, stylizedMsg);
    } else {
        if (!isLocalRun)
            core.setFailed('No tests report data available.');
        else
            console.log(`PR message: ${msg}`);
    }
};

/**
 * @return {string} a title message for the automated comment on the target PR
 * that decorates such comment with a nice title
 */
function getTitleMsg() {
    return "This message is autogenerated, because there's changes in the " +
    "'actions-scripts' folder, which contains JS code that is used for by some " +
    "automations in our workflows.\n"
}

/**
 * Gives formats and stylizes the generated tests reports of 'JEST' to be shown
 * on the PR comment to notify the user about the test results.
 * @param {string} textMsg the input data with the tests results as a report  
 * @returns {string} the tests report formatted and stylized
 */
export function formatTestOutput(textMsg) {
    return textMsg
      .split('\n')
      .map(line => {
        if (line.includes('✓')) {
          return `\t- ✅ ${line.trim()}`;
        }
        if (line.includes('✗')) {
          return `\t- ❌ ${line.trim()}`;
        }
        if (line.startsWith('PASS')) {
          return `🎉 ${line}`;
        }
        if (line.startsWith('FAIL')) {
          return `💥 ${line}`;
        }
        return `\t${line.trim()}`;
      })
      .join('\n');
  }

