# 🎬 SwitchOps Hackathon Demo Video Script (2-3 Minutes)
> **Hackathon**: WeMakeDevs × DevTools Academy: Flip the Switch  
> **Track**: Best Business Workflow ($2,000)  
> **Tools Needed**: Screen recorder (Loom / OBS / QuickTime), Terminal, VS Code / GitHub.

---

## ⏱️ Video Breakdown

### 0:00 - 0:30 | Hook & The Problem
- **Visual**: Show a noisy Slack channel or Datadog/Sentry dashboard with error alerts spiking.
- **Voiceover**:
  > *"Hey everyone! Production incidents are every engineering team's worst nightmare. When a P0 outage strikes, SREs and on-call engineers spend an average of 48 minutes jumping between Sentry alerts, GitHub commit logs, and frantic Slack threads just to figure out what broke and who pushed it. Today, we're introducing **SwitchOps**—an autonomous incident commander that lives directly inside your team's chat rooms using **Switch**."*

---

### 0:30 - 1:15 | The Switch Integration & Live War Room
- **Visual**: Open the terminal and launch the demo with `npm run demo`.
- **Voiceover**:
  > *"Here is how Switch makes this possible. Instead of building isolated bots that talk to themselves, Switch allows us to place our AI agent—SwitchOps—directly into a shared collaboration room with human engineers. Watch what happens when an alert fires in our `#incident-war-room` channel."*
- **Action**: Show Jordan (Staff SRE) sending:  
  `🚨 Checkout failure rate is spiking to 15% right now in production! Sentry is blowing up with 500s. @SwitchOps investigate!`

---

### 1:15 - 2:00 | Autonomous Investigation & GitHub Hotfix PR
- **Visual**: Show `@SwitchOps` responding in real time in the terminal.
- **Voiceover**:
  > *"Instantly, SwitchOps intercepts the error stack trace, queries our GitHub repository, and cross-references recent git history. Within seconds, it pinpoints the culprit commit—`7b4f91e` by Alex—where an undefined property access on `customer.subscription.tier` caused guest checkouts to crash. But SwitchOps doesn't just diagnose; it creates a regression test to reproduce the bug, synthesizes a safe patch using defensive optional chaining, and opens a hotfix Pull Request directly on GitHub with a single click link for the engineers to review!"*

---

### 2:00 - 2:40 | Interactive Team Collaboration & Instant Post-Mortem
- **Visual**: Show Alex acknowledging the fix, and Jordan requesting `@SwitchOps postmortem`.
- **Voiceover**:
  > *"Alex from the backend team immediately chimes in to review the PR. Once verified, Jordan asks SwitchOps for a post-mortem report. Within 3 seconds, SwitchOps delivers an executive-ready post-mortem with exact impact metrics, timeline reconstructed from git and chat timestamps, and assigned preventative action items. What used to take hours of stressful coordination is completed in under 15 minutes."*

---

### 2:40 - 3:00 | Conclusion & Impact
- **Visual**: Show the SwitchOps GitHub README and architecture diagram.
- **Voiceover**:
  > *"SwitchOps showcases the true power of Switch: enabling human engineers and AI teammates to work side-by-side on mission-critical business workflows. Check out our open-source repository on GitHub and deploy SwitchOps to your own war room today. Thank you!"*
