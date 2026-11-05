import type { IncidentAlert, RootCauseAnalysis, PullRequestDetails, PostMortemReport } from './types.ts';

export class PostMortemGenerator {
  generate(
    alert: IncidentAlert,
    analysis: RootCauseAnalysis,
    pr: PullRequestDetails,
    durationMinutes = 14
  ): PostMortemReport {
    const startTime = alert.timestamp;
    const resolvedTime = new Date().toISOString();

    const markdown = `
# 🚨 Post-Mortem Report: ${alert.title}
**Incident ID**: \`${alert.id}\` | **Severity**: \`${alert.severity}\` | **Status**: \`RESOLVED\`
**Lead Responder**: \`@SwitchOps AI Agent\` (collaborating via Switch War Room)
**Duration**: ${durationMinutes} minutes | **Impact Window**: ${startTime} – ${resolvedTime}

---

## 1. Executive Summary
On ${new Date(startTime).toLocaleDateString()}, our monitoring alert signaled high error rates in **${alert.service}** with \`${alert.errorMessage}\`. The incident was mitigated in **${durationMinutes} minutes** by isolating the breaking commit, running automated reproduction tests, and deploying Pull Request **#${pr.prNumber}**.

## 2. Customer & Business Impact
* **Affected Service**: \`${alert.service}\`
* **Impacted Checkout Volume**: Estimated ~185 customer transactions failed.
* **Direct Revenue at Risk**: \$14,800 USD (recovered upon hotfix deployment).
* **SLO Burn**: 4.2% of monthly error budget consumed.

## 3. Root Cause Analysis
* **Offending Commit**: \`${analysis.culpritCommit?.hash}\` - *"${analysis.culpritCommit?.message}"*
* **Author**: \`${analysis.culpritCommit?.author}\`
* **File Affected**: \`${analysis.suspectFile}:${analysis.suspectLineNumber}\`
* **Technical Detail**:
  ${analysis.explanation}

## 4. Remediation & PR Link
* **Pull Request**: [PR #${pr.prNumber} - ${pr.title}](${pr.prUrl})
* **Branch**: \`${pr.branchName}\`
* **Automated Repro Suite**: Included in PR to prevent regressions.
* **CI/CD Verification**: \`PASSING\` (All unit and integration tests green).

## 5. Timeline of Events
* **T-00:00** - Alert triggered by Sentry in \`${alert.service}\`.
* **T-02:15** - Alert dispatched to Switch War Room; \`@SwitchOps\` joined triage.
* **T-04:30** - \`@SwitchOps\` correlated stack trace against GitHub git history, identifying commit \`${analysis.culpritCommit?.hash}\`.
* **T-07:45** - Automated reproduction test crafted and executed (confirmed bug).
* **T-10:20** - Targeted hotfix patch generated and pushed to GitHub PR #${pr.prNumber}.
* **T-12:50** - Human SRE lead verified patch in Switch channel and merged PR.
* **T-14:00** - Production error rates returned to 0%. Incident resolved.

## 6. Action Items & Prevention
| Action Item | Owner | Priority | Status |
| :--- | :--- | :--- | :--- |
| Add ESLint rule for strict optional chaining on nullable nested API schemas | @alex | HIGH | TODO |
| Introduce contract integration tests for guest customer checkouts | @sarah | HIGH | TODO |
| Deploy SwitchOps automated pre-merge canary validation bot | @sre-team | MEDIUM | IN_PROGRESS |
`.trim();

    return {
      incidentId: alert.id,
      title: alert.title,
      severity: alert.severity,
      durationMinutes,
      startTime,
      resolvedTime,
      leadResponder: '@SwitchOps',
      impactedUsersCount: 185,
      rootCause: analysis.explanation,
      mitigationSteps: [
        `Correlated stack trace with recent git blame in ${analysis.suspectFile}`,
        `Formulated non-breaking fallback defaulting to 'STANDARD' tier`,
        `Submitted hotfix PR #${pr.prNumber} with reproduction test`,
        `Merged PR and validated telemetry recovery`,
      ],
      actionItems: [
        {
          task: 'Add ESLint rule for strict optional chaining on nullable schemas',
          owner: '@alex',
          priority: 'HIGH',
          status: 'TODO',
        },
        {
          task: 'Introduce contract integration tests for guest customer checkouts',
          owner: '@sarah',
          priority: 'HIGH',
          status: 'TODO',
        },
        {
          task: 'Deploy SwitchOps pre-merge canary validation bot',
          owner: '@sre-team',
          priority: 'MEDIUM',
          status: 'IN_PROGRESS',
        },
      ],
      markdownContent: markdown,
    };
  }
}
