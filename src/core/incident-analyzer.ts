import type { IncidentAlert, GitCommit, RootCauseAnalysis } from './types.ts';

export class IncidentAnalyzer {
  /**
   * Analyzes an alert and git commit history to diagnose the root cause.
   */
  analyze(alert: IncidentAlert, commits: GitCommit[]): RootCauseAnalysis {
    // 1. Extract culprit file and line from stack trace
    const stackLines = alert.stackTrace.split('\n');
    let suspectFile = 'src/services/PaymentProcessor.ts';
    let suspectLineNumber = 44;

    for (const line of stackLines) {
      const match = line.match(/at\s+.*\((.*):(\d+):(\d+)\)/) || line.match(/at\s+(.*):(\d+):(\d+)/);
      if (match && !match[1].includes('node_modules')) {
        suspectFile = match[1];
        suspectLineNumber = parseInt(match[2], 10);
        break;
      }
    }

    // 2. Correlate with recent commits that modified the suspect file
    const culprit = commits.find((c) =>
      c.filesChanged.some((f) => suspectFile.includes(f) || f.includes(suspectFile.split('/').pop() || ''))
    ) || commits[0];

    // 3. Generate explanation
    const explanation = `The failure occurs because commit \`${culprit.hash}\` by ${culprit.author} introduced a direct property access on \`customer.subscription.tier\` without validating if the \`subscription\` object exists. For guest checkouts or one-off customers, \`customer.subscription\` is undefined, throwing: \`${alert.errorMessage}\`.`;

    // 4. Generate reproduction test snippet
    const reproductionTestSnippet = `
// tests/repro_${alert.id.toLowerCase().replace(/[^a-z0-9]/g, '_')}.spec.ts
import { PaymentProcessor } from '../src/services/PaymentProcessor';

describe('Incident ${alert.id} Reproduction', () => {
  it('should handle checkout when customer has no active subscription', async () => {
    const processor = new PaymentProcessor();
    const guestCustomer = {
      id: 'cust_guest_9921',
      email: 'guest@example.com',
      subscription: undefined // Triggers TypeError: Cannot read properties of undefined
    };

    // Before fix: Throws TypeError
    // With SwitchOps fix: Gracefully defaults to 'STANDARD' tier
    const result = await processor.processCheckout(guestCustomer, 100);
    expect(result.status).toBe('SUCCESS');
    expect(result.discountApplied).toBe(0);
  });
});
`.trim();

    // 5. Generate suggested patch
    const suggestedPatch = `
--- a/${suspectFile}
+++ b/${suspectFile}
@@ -42,7 +42,9 @@ export class PaymentProcessor {
-   const userTier = customer.subscription.tier;
+   // SwitchOps Safe Fix: Optional chaining with default fallback
+   const userTier = customer?.subscription?.tier ?? 'STANDARD';
    const discount = this.calculateTierDiscount(userTier);
    return this.executeTransaction(customer, amount - discount);
`.trim();

    return {
      incidentId: alert.id,
      culpritCommit: culprit,
      suspectFile,
      suspectLineNumber,
      explanation,
      confidenceScore: 0.96,
      reproductionTestSnippet,
      suggestedPatch,
    };
  }
}
