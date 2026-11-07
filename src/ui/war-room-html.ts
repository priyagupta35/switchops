export function getWarRoomHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slack | #incident-war-room-402 | Acme Engineering</title>
  <style>
    :root {
      --slack-bg: #1a1d21;
      --sidebar-bg: #19171d;
      --sidebar-border: #35373b;
      --sidebar-text: #bcabbc;
      --sidebar-active: #1164a3;
      --text-main: #d1d2d3;
      --text-bold: #f8f8f8;
      --text-dim: #abacad;
      --border: #2c3136;
      --card-bg: #222529;
      --accent: #611f69;
      --slack-blue: #1264a3;
      --danger: #e01e5a;
      --success: #2bac76;
      --warning: #ecb22e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: var(--slack-bg);
      color: var(--text-main);
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    /* Top Global Slack Search Bar */
    .top-nav {
      height: 38px;
      background: #121016;
      border-bottom: 1px solid #28252d;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      flex-shrink: 0;
    }
    .top-search {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 6px;
      padding: 4px 24px;
      color: #fff;
      font-size: 13px;
      width: 440px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
    }
    .top-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: #abacad;
    }
    .profile-badge {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background: #4a154b;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 11px;
    }

    /* Workspace Shell */
    .workspace-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    /* Left Sidebar */
    .sidebar {
      width: 260px;
      background: var(--sidebar-bg);
      border-right: 1px solid var(--sidebar-border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .workspace-header {
      padding: 14px 16px;
      border-bottom: 1px solid var(--sidebar-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
    .workspace-name {
      font-size: 16px;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 12px 0;
    }
    .sidebar-group-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--sidebar-text);
      padding: 6px 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .channel-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      color: #bcabbc;
      font-size: 14px;
      cursor: pointer;
    }
    .channel-item:hover { background: rgba(255, 255, 255, 0.05); color: #fff; }
    .channel-item.active {
      background: var(--sidebar-active);
      color: #ffffff;
      font-weight: 600;
    }
    .dm-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 5px 16px;
      color: #bcabbc;
      font-size: 13.5px;
      cursor: pointer;
    }
    .dm-item:hover { background: rgba(255, 255, 255, 0.05); color: #fff; }
    .status-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--success);
    }
    .status-dot.bot {
      background: #611f69;
      border: 1px solid #a855f7;
    }

    /* Main Chat View */
    .chat-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--slack-bg);
      overflow: hidden;
    }

    /* Channel Header */
    .channel-header {
      height: 52px;
      border-bottom: 1px solid var(--border);
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--slack-bg);
    }
    .channel-title-wrap {
      display: flex;
      flex-direction: column;
    }
    .channel-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--text-bold);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .channel-topic {
      font-size: 12px;
      color: var(--text-dim);
    }
    .header-pills {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .live-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(224, 30, 90, 0.15);
      border: 1px solid var(--danger);
      color: #f87171;
      padding: 4px 10px;
      border-radius: 14px;
      font-size: 11px;
      font-weight: 700;
    }
    .pulse-dot {
      width: 7px;
      height: 7px;
      background: var(--danger);
      border-radius: 50%;
      animation: pulse 1.4s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(1.3); }
      100% { opacity: 1; transform: scale(1); }
    }
    .sim-button {
      background: var(--slack-blue);
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sim-button:hover { background: #0b4e82; }

    /* Bookmarks Bar */
    .bookmarks-bar {
      height: 32px;
      border-bottom: 1px solid var(--border);
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 12px;
      color: var(--text-dim);
      background: rgba(255, 255, 255, 0.015);
    }
    .bookmark-link {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--text-dim);
      cursor: pointer;
      text-decoration: none;
    }
    .bookmark-link:hover { color: #fff; }

    /* Message Feed */
    .message-stream {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .slack-message {
      display: flex;
      gap: 12px;
      font-size: 14.5px;
      line-height: 1.46;
      animation: fadeIn 0.25s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .slack-avatar {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      flex-shrink: 0;
      background: #2b3038;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      color: white;
    }
    .avatar-sentry { background: #e01e5a; }
    .avatar-switch {
      background: linear-gradient(135deg, #611f69, #1264a3);
      box-shadow: 0 0 10px rgba(97, 31, 105, 0.6);
    }
    .avatar-jordan { background: #007a5a; }
    .avatar-alex { background: #d97706; }

    .msg-content { flex: 1; }
    .msg-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 3px;
    }
    .msg-author {
      font-weight: 800;
      color: var(--text-bold);
      font-size: 14px;
    }
    .bot-badge {
      background: #383d44;
      color: #cbd5e1;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
    }
    .msg-timestamp {
      font-size: 11.5px;
      color: var(--text-dim);
    }

    /* Slack Block Kit Card */
    .slack-card {
      margin-top: 6px;
      background: var(--card-bg);
      border-left: 4px solid var(--slack-blue);
      border-radius: 0 6px 6px 0;
      padding: 12px 16px;
      font-size: 13.5px;
    }
    .slack-card.sentry-card {
      border-left-color: var(--danger);
      background: #231c21;
    }
    .slack-card.guardrail-card {
      border-left-color: var(--warning);
      background: #26231e;
    }
    .slack-card.success-card {
      border-left-color: var(--success);
      background: #1c2621;
    }

    .card-title {
      font-weight: 800;
      font-size: 14px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .code-snippet {
      background: #121417;
      border: 1px solid #2e343b;
      border-radius: 5px;
      padding: 8px 12px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 12.5px;
      color: #e2e8f0;
      margin: 8px 0;
      overflow-x: auto;
    }
    .tags-row {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      font-size: 11px;
    }
    .slack-tag {
      background: #181b1f;
      border: 1px solid #2f343b;
      color: #94a3b8;
      padding: 2px 7px;
      border-radius: 4px;
    }
    .slack-tag strong { color: #f1f5f9; }

    /* Action Buttons in Block Kit */
    .slack-btn-row {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .slack-btn {
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn-approve-slack {
      background: #007a5a;
      color: white;
    }
    .btn-approve-slack:hover { background: #148565; }
    .btn-deny-slack {
      background: #2c3136;
      color: #d1d2d3;
      border: 1px solid #444c56;
    }
    .btn-deny-slack:hover { background: #3b424b; }

    /* Emoji Reactions */
    .slack-reactions {
      display: flex;
      gap: 6px;
      margin-top: 6px;
    }
    .reaction-pill {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 2px 7px;
      font-size: 11.5px;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }
    .reaction-pill:hover { background: rgba(255, 255, 255, 0.12); }

    /* Slack Message Input Box */
    .slack-footer {
      padding: 12px 20px 20px 20px;
      background: var(--slack-bg);
    }
    .input-box-container {
      background: #222529;
      border: 1px solid #474f59;
      border-radius: 8px;
      overflow: hidden;
    }
    .input-toolbar {
      padding: 4px 10px;
      background: #1b1e22;
      border-bottom: 1px solid #2e343b;
      display: flex;
      gap: 12px;
      font-size: 12px;
      color: var(--text-dim);
    }
    .input-toolbar span { cursor: pointer; }
    .input-toolbar span:hover { color: #fff; }
    .input-row {
      display: flex;
      align-items: center;
      padding: 8px 12px;
    }
    .input-row input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      font-size: 14px;
    }
    .send-btn {
      background: #007a5a;
      border: none;
      color: white;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 700;
    }
    .send-btn:hover { background: #148565; }

    /* Typing Bar */
    .typing-bar {
      height: 18px;
      padding: 0 20px;
      font-size: 11.5px;
      color: var(--text-dim);
      display: none;
    }
  </style>
</head>
<body>

  <!-- Top Global Slack Search Bar -->
  <div class="top-nav">
    <div style="font-weight: 800; font-size: 13px; color: #fff; display: flex; align-items: center; gap: 8px;">
      <span style="color: #e01e5a;">●</span> Acme Engineering War Room
    </div>
    <div class="top-search">
      🔍 Search messages, files, or incidents in #incident-war-room-402 (Ctrl + K)
    </div>
    <div class="top-actions">
      <span>🔔 Alerts: ON</span>
      <div class="profile-badge">JR</div>
    </div>
  </div>

  <div class="workspace-body">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="workspace-header">
        <div class="workspace-name">
          Acme Corp ▾
        </div>
        <span style="font-size: 11px; background: #35373b; padding: 2px 6px; border-radius: 4px; color: #fff;">PROD</span>
      </div>

      <div class="sidebar-content">
        <div class="sidebar-group-title">Channels</div>
        <div class="channel-item"># general</div>
        <div class="channel-item"># techpulse-dev</div>
        <div class="channel-item"># deployments</div>
        <div class="channel-item">
          # alerts-critical
          <span style="margin-left: auto; background: var(--danger); color: white; border-radius: 10px; font-size: 10px; padding: 1px 6px; font-weight: bold;">3</span>
        </div>
        <div class="channel-item active">
          🔒 #incident-war-room-402
        </div>

        <div class="sidebar-group-title" style="margin-top: 14px;">War Room Responders</div>
        <div class="dm-item">
          <div class="status-dot"></div>
          <span>Jordan Rivera (Staff SRE Lead)</span>
        </div>
        <div class="dm-item">
          <div class="status-dot"></div>
          <span>Alex Rivera (Senior Backend)</span>
        </div>
        <div class="dm-item">
          <div class="status-dot bot"></div>
          <span style="font-weight: 700; color: #e2e8f0;">⚡ SwitchOps [APP]</span>
          <span style="font-size: 10px; background: rgba(14, 165, 233, 0.2); color: #38bdf8; padding: 1px 4px; border-radius: 3px; margin-left: 4px;">OpenCode</span>
        </div>
        <div class="dm-item">
          <div class="status-dot" style="background: #e01e5a;"></div>
          <span>Sentry Integration [APP]</span>
        </div>

        <div style="margin-top: auto; padding: 14px 16px; border-top: 1px solid var(--sidebar-border); font-size: 11.5px; color: var(--sidebar-text); line-height: 1.5;">
          🏆 <strong>Flip the Switch Hackathon</strong><br>
          • <strong>Track 1</strong>: Best Business Workflow<br>
          • <strong>Agent Harness</strong>: OpenCode<br>
          • <strong>Platform</strong>: Switch AI Bridge<br>
          • <strong>Guardrail</strong>: Human-in-the-Loop
        </div>
      </div>
    </div>

    <!-- Main Chat Container -->
    <div class="chat-container">
      <!-- Channel Header -->
      <div class="channel-header">
        <div class="channel-title-wrap">
          <div class="channel-title">
            🔒 #incident-war-room-402 ⭐️
          </div>
          <div class="channel-topic">
            <strong>Track 1: Best Business Workflow</strong> | Automated Incident Triage &amp; Remediation | Agent: OpenCode via Switch | Target: <code>priyagupta35/techpulse</code>
          </div>
        </div>
        <div class="header-pills">
          <div class="live-indicator" id="livePill">
            <div class="pulse-dot"></div>
            P0 CRITICAL OUTAGE
          </div>
          <button class="sim-button" onclick="triggerIncidentSimulation()">
            ▶️ Run Incident Simulation
          </button>
        </div>
      </div>

      <!-- Bookmarks Bar -->
      <div class="bookmarks-bar">
        <span class="bookmark-link">📋 <strong>Incident Canvas</strong></span>
        <span>|</span>
        <span class="bookmark-link">📊 Datadog Telemetry</span>
        <span>|</span>
        <span class="bookmark-link">🐙 GitHub: priyagupta35/techpulse</span>
        <span>|</span>
        <span class="bookmark-link">📖 SRE Runbook: Triage-v4</span>
      </div>

      <!-- Message Stream -->
      <div class="message-stream" id="messageStream">
        <!-- Initial Message -->
        <div class="slack-message">
          <div class="slack-avatar avatar-switch">⚡</div>
          <div class="msg-content">
            <div class="msg-header">
              <span class="msg-author">SwitchOps</span>
              <span class="bot-badge">APP</span>
              <span class="msg-timestamp">Today at 11:00 AM</span>
            </div>
            <div>
              Connected to channel <strong>#incident-war-room-402</strong> via the <strong>Switch Agent Bridge</strong>.<br>
              Monitoring live Sentry, Datadog & TechPulse webhook feeds. Standing by for incident correlation.
            </div>
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div class="typing-bar" id="typingBar">
        <strong>SwitchOps [APP]</strong> is correlating git blame and drafting hotfix...
      </div>

      <!-- Footer Message Input -->
      <div class="slack-footer">
        <div class="input-box-container">
          <div class="input-toolbar">
            <span><strong>B</strong></span>
            <span><em>I</em></span>
            <span>&lt;&gt;</span>
            <span>🔗</span>
            <span>@ Mention</span>
          </div>
          <div class="input-row">
            <input type="text" id="slackInput" placeholder="Message #incident-war-room-402 or ask @SwitchOps anything..." onkeydown="handleInputKey(event)">
            <button class="send-btn" onclick="sendHumanMessage()">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const stream = document.getElementById('messageStream');
    const typingBar = document.getElementById('typingBar');

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    // Connect to Server-Sent Events (SSE) for LIVE REAL-WORLD ALERTS from TechPulse!
    try {
      const evtSource = new EventSource('/api/events');
      evtSource.onmessage = (e) => {
        try {
          const payload = JSON.parse(e.data);
          if (payload.type === 'ALERT_RECEIVED') {
            displayLiveAlertFromTechPulse(payload.data);
          } else if (payload.type === 'ANALYSIS_COMPLETE') {
            displayLiveSwitchOpsTriage(payload.data);
          }
        } catch(err) {}
      };
    } catch(err) {}

    function appendMessage(avatarClass, avatarText, author, isBot, htmlContent, reactions = []) {
      const div = document.createElement('div');
      div.className = 'slack-message';

      let rxHtml = '';
      if (reactions.length > 0) {
        rxHtml = '<div class="slack-reactions">';
        reactions.forEach(rx => {
          rxHtml += \`<div class="reaction-pill">\${rx.emoji} \${rx.count}</div>\`;
        });
        rxHtml += '</div>';
      }

      div.innerHTML = \`
        <div class="slack-avatar \${avatarClass}">\${avatarText}</div>
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-author">\${author}</span>
            \${isBot ? '<span class="bot-badge">APP</span>' : ''}
            <span class="msg-timestamp">Today at \${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div>\${htmlContent}</div>
          \${rxHtml}
        </div>
      \`;
      stream.appendChild(div);
      stream.scrollTop = stream.scrollHeight;
    }

    // Displays an authentic Sentry Bot Alert (works for both simulation and real TechPulse HTTP alerts)
    function displayLiveAlertFromTechPulse(alert) {
      appendMessage('avatar-sentry', 'S', 'Sentry Integration', true, \`
        <div class="slack-card sentry-card">
          <div class="card-title">
            <span style="color: #e01e5a;">⚠️ Sentry Issue Alert</span>: \${alert.title}
          </div>
          <div style="font-size: 13px; color: #f87171; font-weight: 700; margin-bottom: 6px;">
            \${alert.errorMessage}
          </div>
          <div class="code-snippet">\${alert.stackTrace}</div>
          <div class="tags-row">
            <span class="slack-tag">service: <strong>\${alert.service || 'techpulse-auth'}</strong></span>
            <span class="slack-tag">repo: <strong>priyagupta35/techpulse</strong></span>
            <span class="slack-tag">severity: <strong>P0_CRITICAL</strong></span>
            <span class="slack-tag">handled: <strong>false</strong></span>
          </div>
        </div>
      \`, [{emoji: '🔥', count: 3}, {emoji: '👀', count: 2}]);
    }

    // Displays authentic SwitchOps response with Guardrail card
    function displayLiveSwitchOpsTriage(data) {
      appendMessage('avatar-switch', '⚡', 'SwitchOps', true, \`
        <div class="slack-card">
          <div class="card-title">
            <span>🎯 Automated Incident Triage &amp; Root Cause Analysis (96% Confidence)</span>
          </div>
          <div style="font-size: 11.5px; color: #38bdf8; margin-bottom: 6px; font-weight: 700;">
            ⚙️ Executed via OpenCode Agent Harness on Switch Collaboration Bridge
          </div>
          <div style="line-height: 1.5; margin-bottom: 8px;">
            The failure was introduced in commit <code style="background: #111417; padding: 2px 6px; border-radius: 4px;">7b4f91e</code> by <strong>Alex Rivera</strong>.<br>
            Direct access on null <code>RegisterRequest</code> payload throws <code>NullPointerException</code> on empty request bodies.
          </div>

          <div class="code-snippet">
--- a/src/main/java/com/techpulse/controller/AuthController.java
+++ b/src/main/java/com/techpulse/controller/AuthController.java
@@ -24,4 +24,8 @@ public ResponseEntity&lt;?&gt; register(@RequestBody RegisterRequest request) {
-    User user = userService.register(request.getEmail(), request.getPassword());
+    // SwitchOps Safe Fix: Add null-safe validation boundary
+    if (request == null || request.getEmail() == null) {
+        return ResponseEntity.badRequest().body("Invalid registration payload");
+    }
+    User user = userService.register(request.getEmail(), request.getPassword());
          </div>

          <!-- Pull Request Card -->
          <div style="background: #161a20; border: 1px solid #30363d; border-radius: 6px; padding: 10px; margin-top: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; color: #58a6ff;">🐙 Pull Request #14: fix(auth): null-safe validation for RegisterRequest</span>
              <span style="background: #238636; color: white; padding: 2px 7px; border-radius: 10px; font-size: 11px; font-weight: bold;">✓ 42/42 CI Passed</span>
            </div>
            <div style="font-size: 11.5px; color: #8b949e; margin-top: 4px;">
              Target: <code>priyagupta35/techpulse:main</code> &bull; Branch: <code>switchops/hotfix-techpulse-inc-7701</code>
            </div>
          </div>
        </div>

        <!-- Human Permission Guardrail Card -->
        <div class="slack-card guardrail-card" id="guardrailCard">
          <div class="card-title" style="color: #ecb22e;">
            <span>🛡️ Switch Human-in-the-Loop Guardrail: Deployment Authorization</span>
          </div>
          <div style="font-size: 13px; line-height: 1.5; color: #e2e8f0; margin-bottom: 8px;">
            Autonomous hotfix verified in sandbox. <strong>Switch policy prevents unapproved production deployments</strong>. Please review PR #14 and authorize production rollout:
          </div>
          <div class="tags-row" style="margin-bottom: 10px;">
            <span class="slack-tag">target: <strong>AWS ECS Cluster (production)</strong></span>
            <span class="slack-tag">action: <strong>merge &amp; rolling update</strong></span>
            <span class="slack-tag" style="border-color: #e01e5a; color: #f87171;">risk: <strong>HIGH</strong></span>
          </div>
          <div class="slack-btn-row" id="guardrailButtons">
            <button class="slack-btn btn-approve-slack" onclick="approveDeployment()">✅ Approve &amp; Deploy to Production</button>
            <button class="slack-btn btn-deny-slack" onclick="denyDeployment()">❌ Deny &amp; Abort</button>
          </div>
        </div>
      \`);
    }

    async function approveDeployment() {
      const btns = document.getElementById('guardrailButtons');
      if (btns) {
        btns.innerHTML = \`<span style="color: #2bac76; font-weight: 700; font-size: 12.5px;">✅ AUTHORIZED by Jordan Rivera (Staff SRE Lead) at \${new Date().toLocaleTimeString()}</span>\`;
      }

      // Jordan chat
      appendMessage('avatar-jordan', 'JR', 'Jordan Rivera', false,
        'Reviewed the diff on GitHub. It safely handles null payloads in RegisterRequest. Approved deployment.');

      typingBar.style.display = 'block';
      await sleep(1500);
      typingBar.style.display = 'none';

      // SwitchOps deployment confirmation
      appendMessage('avatar-switch', '⚡', 'SwitchOps', true, \`
        <div class="slack-card success-card">
          <div class="card-title" style="color: #2bac76;">
            <span>🚀 Production Deployment Complete</span>
          </div>
          <div>
            • PR #14 successfully merged into <code>main</code>.<br>
            • AWS ECS canary container health: <strong>100% HEALTHY</strong>.<br>
            • Registration API error rate dropped from 15.2% &rarr; <strong>0.00%</strong>.<br>
            • Incident <strong>INC-7701</strong> is marked <strong>RESOLVED</strong>.
          </div>
        </div>
      \`, [{emoji: '🚀', count: 5}, {emoji: '🎉', count: 4}]);

      const livePill = document.getElementById('livePill');
      if (livePill) {
        livePill.style.background = 'rgba(43, 172, 118, 0.15)';
        livePill.style.borderColor = '#2bac76';
        livePill.style.color = '#2bac76';
        livePill.innerHTML = '✓ INCIDENT RESOLVED';
      }

      await sleep(1200);

      // Postmortem report
      appendMessage('avatar-switch', '⚡', 'SwitchOps', true, \`
        <div class="slack-card">
          <div class="card-title">
            <span>📄 Incident Post-Mortem Generated (INC-7701)</span>
          </div>
          <div style="font-size: 13px; line-height: 1.6;">
            <strong>• Service</strong>: TechPulse Registration API<br>
            <strong>• Duration</strong>: 14 Minutes | <strong>Financial Risk Mitigated</strong>: $14,800 USD<br>
            <strong>• Root Cause</strong>: Missing payload null check in <code>RegisterRequest.java</code><br>
            <strong>• Action Items</strong>:
            <div style="margin-left: 12px; margin-top: 4px;">
              1. Add <code>@NotNull</code> validation annotations across all TechPulse DTOs (@alex)<br>
              2. Add integration test covering empty JSON requests (@sarah)<br>
              3. Deploy SwitchOps pre-merge canary bot to CI pipeline (@sre-team)
            </div>
          </div>
        </div>
      \`);
    }

    function denyDeployment() {
      const btns = document.getElementById('guardrailButtons');
      if (btns) {
        btns.innerHTML = \`<span style="color: #e01e5a; font-weight: 700; font-size: 12.5px;">❌ DENIED by Human SRE at \${new Date().toLocaleTimeString()}</span>\`;
      }
      appendMessage('avatar-switch', '⚡', 'SwitchOps', true,
        '⚠️ <strong>Deployment Aborted</strong>: Hotfix deployment was halted per human command. No changes applied.');
    }

    async function triggerIncidentSimulation() {
      // 1. Sentry alert
      displayLiveAlertFromTechPulse({
        title: 'NullPointerException in RegisterRequest',
        service: 'techpulse-auth-service',
        errorMessage: 'NullPointerException: Cannot invoke getEmail() on null RegisterRequest',
        stackTrace: 'java.lang.NullPointerException: Cannot invoke getEmail() on null RegisterRequest\\n    at com.techpulse.service.UserService.registerUser(UserService.java:38)\\n    at com.techpulse.controller.AuthController.register(AuthController.java:24)'
      });

      await sleep(1400);

      // 2. Jordan mentions SwitchOps
      appendMessage('avatar-jordan', 'JR', 'Jordan Rivera', false,
        '🚨 <strong>@channel</strong> Auth service failure rate is spiking to 15% in production right now. Sentry is firing P0 alerts on <code>RegisterRequest</code>. <strong>@SwitchOps</strong> please execute <strong>automated incident triage</strong> and root cause analysis.',
        [{emoji: '👀', count: 3}]);

      typingBar.style.display = 'block';
      await sleep(2000);
      typingBar.style.display = 'none';

      // 3. SwitchOps responds
      displayLiveSwitchOpsTriage({});
    }

    function handleInputKey(e) {
      if (e.key === 'Enter') sendHumanMessage();
    }

    function sendHumanMessage() {
      const input = document.getElementById('slackInput');
      const val = input.value.trim();
      if (!val) return;
      appendMessage('avatar-jordan', 'JR', 'Jordan Rivera', false, val);
      input.value = '';

      typingBar.style.display = 'block';
      setTimeout(() => {
        typingBar.style.display = 'none';
        const low = val.toLowerCase();
        if (low.includes('status')) {
          appendMessage('avatar-switch', '⚡', 'SwitchOps', true,
            '📊 <strong>Room Status</strong>: All systems nominal. Monitoring <code>priyagupta35/techpulse</code>.');
        } else if (low.includes('diff') || low.includes('commit')) {
          appendMessage('avatar-switch', '⚡', 'SwitchOps', true,
            '🔍 <strong>Commit 7b4f91e</strong> by Alex Rivera modified <code>AuthController.java</code> and <code>RegisterRequest.java</code> 18 minutes ago.');
        } else {
          appendMessage('avatar-switch', '⚡', 'SwitchOps', true,
            \`⚡ Acknowledged: "\${val}". SwitchOps is actively monitoring this room.\`);
        }
      }, 700);
    }
  </script>
</body>
</html>`;
}
