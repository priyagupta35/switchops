import { SwitchBridge } from '../core/switch-bridge.ts';
import { SwitchOpsAgent } from '../core/agent.ts';
import { SAMPLE_INCIDENTS } from './sample-incident-data.ts';

// ANSI colors for clean visual presentation in terminal / demo video
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function printHeader(): void {
  console.clear();
  console.log(`${colors.cyan}${colors.bright}`);
  console.log('╔═══════════════════════════════════════════════════════════════════════╗');
  console.log('║               SWITCH-OPS : AUTONOMOUS INCIDENT COMMANDER              ║');
  console.log('║       Powered by Switch AI (WeMakeDevs Flip the Switch Hackathon)     ║');
  console.log('║        Track 1: Best Business Workflow ($2,000 Prize Category)        ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}\n`);
}

async function runInteractiveDemo(): Promise<void> {
  printHeader();

  console.log(`${colors.yellow}Connecting to Switch Room: #incident-war-room (ID: incident-war-room-402)...${colors.reset}`);
  await sleep(1000);

  const bridge = new SwitchBridge('incident-war-room-402', '#incident-war-room', 'slack');
  const agent = new SwitchOpsAgent(bridge);

  console.log(`${colors.green}✓ Switch Bridge connected. Active Participants:${colors.reset}`);
  console.log(`  • Jordan Rivera (Staff SRE Lead)`);
  console.log(`  • Alex Rivera (Senior Backend Dev)`);
  console.log(`  • ${colors.cyan}@SwitchOps (Autonomous AI Incident Commander)${colors.reset}\n`);
  console.log('─────────────────────────────────────────────────────────────────────────\n');

  await sleep(1200);

  // Turn 1: On-call engineer sounds the alarm
  console.log(`${colors.blue}${colors.bright}[17:42:01] Jordan Rivera (Staff SRE Lead):${colors.reset}`);
  console.log(`"🚨 @channel Checkout failure rate is spiking to 15% right now in production! Sentry is blowing up with 500s. @SwitchOps investigate!"\n`);
  await sleep(2000);

  // Turn 2: SwitchOps triggers autonomous triage and remediation
  console.log(`${colors.cyan}${colors.bright}[17:42:05] 🤖 @SwitchOps (via Switch AI Agent Bridge):${colors.reset}`);
  const incidentResult = await agent.triggerIncidentWorkflow(SAMPLE_INCIDENTS.payment_npe);
  console.log(incidentResult);
  console.log('\n─────────────────────────────────────────────────────────────────────────\n');
  await sleep(2500);

  // Turn 3: Senior Backend Dev responds to the culprit identification
  console.log(`${colors.magenta}${colors.bright}[17:42:12] Alex Rivera (Senior Backend Dev):${colors.reset}`);
  console.log(`"Shoot, that was my PR from 20 minutes ago! I assumed all customer objects had active subscriptions populated. Checking the hotfix PR link now..."\n`);
  await sleep(2000);

  // Turn 4: SRE Lead asks SwitchOps for postmortem and prevention summary
  console.log(`${colors.blue}${colors.bright}[17:42:18] Jordan Rivera (Staff SRE Lead):${colors.reset}`);
  console.log(`"@SwitchOps postmortem --include-action-items"\n`);
  await sleep(2000);

  // Turn 5: SwitchOps delivers the full Post-Mortem Incident Report
  console.log(`${colors.cyan}${colors.bright}[17:42:22] 🤖 @SwitchOps (via Switch AI Agent Bridge):${colors.reset}`);
  const postmortemReply = await agent.handleIncomingMessage({
    id: 'msg_pm_req',
    roomId: 'incident-war-room-402',
    sender: { id: 'human_sre_lead', name: 'Jordan Rivera', role: 'human' },
    text: '@SwitchOps postmortem',
    timestamp: new Date().toISOString(),
    platform: 'slack',
  });
  console.log(postmortemReply);

  console.log('\n─────────────────────────────────────────────────────────────────────────');
  console.log(`${colors.green}${colors.bright}✅ DEMO COMPLETE: Full end-to-end incident lifecycle resolved in < 15 minutes!${colors.reset}`);
  console.log(`${colors.dim}This proves how Switch brings AI coding agents directly into team chat rooms to execute mission-critical business workflows.${colors.reset}\n`);
}

runInteractiveDemo().catch((err) => {
  console.error('Demo error:', err);
});
