# 🎬 SwitchOps Hackathon Demo Video Script (2-3 Minutes)
> **Hackathon**: WeMakeDevs × DevTools Academy: Flip the Switch  
> **Track**: Best Business Workflow ($2,000)  
> **Agent Harness**: OpenCode  
> **Collaboration Layer**: Switch AI  
> **Target App**: TechPulse Backend Service  

---

## ⏱️ Video Recording Breakdown

### 0:00 - 0:30 | Hook & Problem Statement
- **Visual**: Show your browser with your GitHub repo (`https://github.com/priyagupta35/switchops`).
- **Voiceover**:
  > *"Hello everyone! For the WeMakeDevs Flip the Switch Hackathon, we built **SwitchOps** for Track 1: Best Business Workflow. When critical P0 outages hit production, engineering teams lose over 48 minutes juggling Sentry alerts, Slack threads, and Git blame just to find what broke. With SwitchOps, we connected the **OpenCode** AI coding agent directly into our Slack war room using **Switch**."*

---

### 0:30 - 1:15 | The Slack War Room & Live TechPulse Alert
- **Visual**: Switch to your browser tab at `http://localhost:3000` showing the authentic Slack `#incident-war-room-402`.
- **Voiceover**:
  > *"Here is our live Slack Incident War Room. Through Switch, our AI teammate `@SwitchOps` sits alongside human engineers like Jordan, our SRE lead, and Alex, our backend engineer. Watch what happens when an alert fires from our real-world microservice: **TechPulse**."*
- **Action**: Click `▶️ Run Incident Simulation` (or run `.\trigger-techpulse-alert.ps1` in PowerShell).
- **Voiceover**:
  > *"Sentry intercepts a critical `NullPointerException` on `RegisterRequest.java` and sends a webhook to SwitchOps."*

---

### 1:15 - 1:55 | OpenCode Code Diagnosis & Cloned Repo Modification
- **Visual**: Point to the SwitchOps card showing commit `7b4f91e` by Alex and the Java code diff.
- **Voiceover**:
  > *"Instantly, SwitchOps triggers the OpenCode agent harness. OpenCode parses the stack trace, traces recent Git blame, and isolates culprit commit `7b4f91e` where missing payload validation caused empty requests to crash. But OpenCode doesn't just diagnose—it writes the defensive Java fix and a JUnit regression test directly to our cloned repository files on disk, and opens GitHub Pull Request #14!"*

---

### 1:55 - 2:30 | Switch Human-in-the-Loop Guardrail & Post-Mortem
- **Visual**: Point to the amber Slack Guardrail card.
- **Voiceover**:
  > *"Now notice the key Switch feature: **Human-in-the-Loop Guardrails**. Switch policy strictly blocks autonomous agents from deploying to production without human authorization. OpenCode pauses and presents an interactive Slack approval gate."*
- **Action**: Click **`[ ✅ Approve & Deploy to Production ]`** on the screen.
- **Voiceover**:
  > *"Once Jordan reviews the diff and approves, SwitchOps rolls out the canary update, verifies 0% error rates, marks the incident resolved, and publishes an executive post-mortem with financial metrics and assigned action items."*

---

### 2:30 - 2:45 | Conclusion & Call to Action
- **Visual**: Show the GitHub repo README.
- **Voiceover**:
  > *"SwitchOps proves how Switch and OpenCode turn AI coding agents from isolated CLI tools into true collaborative teammates that solve mission-critical business workflows. Check out our open-source repo on GitHub. Thank you!"*
