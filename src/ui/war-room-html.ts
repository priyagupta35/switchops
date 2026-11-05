export function getWarRoomHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SwitchOps War Room | Powered by Switch AI</title>
  <style>
    :root {
      --bg-dark: #1a1d21;
      --sidebar-bg: #111417;
      --card-bg: #222529;
      --accent-color: #6366f1;
      --accent-hover: #4f46e5;
      --text-main: #e2e8f0;
      --text-dim: #94a3b8;
      --danger: #ef4444;
      --success: #10b981;
      --warning: #f59e0b;
      --border-color: #2e343b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg-dark);
      color: var(--text-main);
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    /* Sidebar */
    .sidebar {
      width: 280px;
      background: var(--sidebar-bg);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
    }
    .sidebar-header {
      padding: 18px 20px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .switch-logo {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      color: #fff;
      font-size: 16px;
    }
    .org-title {
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.2px;
    }
    .sidebar-section {
      padding: 16px 20px;
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--text-dim);
      margin-bottom: 12px;
      font-weight: 700;
    }
    .channel-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 6px;
      color: var(--text-dim);
      font-size: 14px;
      cursor: pointer;
      margin-bottom: 2px;
    }
    .channel-item.active {
      background: #272a30;
      color: #fff;
      font-weight: 600;
    }
    .channel-item .badge {
      margin-left: auto;
      background: var(--danger);
      color: #fff;
      font-size: 10px;
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 10px;
    }
    .participant-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 0;
      font-size: 13px;
    }
    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #475569;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      position: relative;
    }
    .avatar.agent-avatar {
      background: linear-gradient(135deg, #6366f1, #ec4899);
    }
    .online-dot {
      position: absolute;
      bottom: -1px;
      right: -1px;
      width: 8px;
      height: 8px;
      background: var(--success);
      border-radius: 50%;
      border: 2px solid var(--sidebar-bg);
    }
    /* Main War Room */
    .chat-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--bg-dark);
    }
    .chat-header {
      padding: 14px 24px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #1b1e22;
    }
    .channel-info h2 {
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .room-badge {
      background: #2e343b;
      color: var(--text-dim);
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 12px;
    }
    .incident-status-pill {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid var(--danger);
      color: #f87171;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      background: var(--danger);
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.3); }
      100% { opacity: 1; transform: scale(1); }
    }
    .header-actions {
      display: flex;
      gap: 10px;
    }
    .btn {
      background: var(--accent-color);
      color: white;
      border: none;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn:hover { background: var(--accent-hover); }
    .btn-secondary {
      background: #2e343b;
      color: var(--text-main);
    }
    .btn-secondary:hover { background: #3b424b; }

    /* Messages Stream */
    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .message-row {
      display: flex;
      gap: 14px;
      max-width: 900px;
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .msg-avatar {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .msg-avatar.agent-msg-avatar {
      background: linear-gradient(135deg, #6366f1, #a855f7);
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
    }
    .msg-body {
      flex: 1;
    }
    .msg-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .msg-author {
      font-weight: 700;
      font-size: 14px;
    }
    .msg-role-badge {
      background: #2e343b;
      color: #cbd5e1;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .msg-role-badge.agent {
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      border: 1px solid rgba(99, 102, 241, 0.4);
    }
    .msg-time {
      font-size: 11px;
      color: var(--text-dim);
    }
    .msg-bubble {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 14px 16px;
      font-size: 14px;
      line-height: 1.6;
    }
    .msg-bubble.alert-bubble {
      border-left: 4px solid var(--danger);
      background: rgba(239, 68, 68, 0.05);
    }
    .msg-bubble.agent-bubble {
      border-left: 4px solid var(--accent-color);
      background: rgba(99, 102, 241, 0.04);
    }
    .code-box {
      background: #111417;
      border: 1px solid #2e343b;
      border-radius: 6px;
      padding: 10px 14px;
      font-family: Consolas, Monaco, monospace;
      font-size: 13px;
      color: #f1f5f9;
      margin: 8px 0;
      overflow-x: auto;
    }
    .pr-card {
      margin-top: 10px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 14px;
    }
    .pr-title {
      font-size: 14px;
      font-weight: 700;
      color: #58a6ff;
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
    }
    .pr-tag {
      background: #238636;
      color: white;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 600;
    }
    /* Typing Indicator */
    .typing-indicator {
      display: none;
      align-items: center;
      gap: 6px;
      color: var(--text-dim);
      font-size: 12px;
      padding: 6px 24px;
    }
    .typing-dots span {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--accent-color);
      animation: blink 1.4s infinite both;
    }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes blink {
      0%, 80%, 100% { opacity: 0; }
      40% { opacity: 1; }
    }

    /* Input Footer */
    .chat-footer {
      padding: 16px 24px;
      background: #1b1e22;
      border-top: 1px solid var(--border-color);
    }
    .input-wrapper {
      display: flex;
      gap: 10px;
      background: #111417;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 8px 12px;
    }
    .input-wrapper input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      font-size: 14px;
    }
  </style>
</head>
<body>

  <!-- Sidebar -->
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="switch-logo">⚡</div>
      <div>
        <div class="org-title">Acme Engineering</div>
        <div style="font-size: 11px; color: var(--text-dim);">Switch Room Bridge v1.0</div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="section-title">Incident Rooms</div>
      <div class="channel-item"># general</div>
      <div class="channel-item"># alerts-prod</div>
      <div class="channel-item active">
        <span># incident-war-room</span>
        <span class="badge">P0</span>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="section-title">Room Teammates (Switch)</div>
      <div class="participant-item">
        <div class="avatar agent-avatar">🤖<div class="online-dot"></div></div>
        <div>
          <div style="font-weight: 600; color: #818cf8;">SwitchOps</div>
          <div style="font-size: 10px; color: var(--text-dim);">AI Incident Commander</div>
        </div>
      </div>
      <div class="participant-item">
        <div class="avatar">👨‍💻<div class="online-dot"></div></div>
        <div>
          <div style="font-weight: 600;">Jordan Rivera</div>
          <div style="font-size: 10px; color: var(--text-dim);">Staff SRE Lead</div>
        </div>
      </div>
      <div class="participant-item">
        <div class="avatar">👨‍🔧<div class="online-dot"></div></div>
        <div>
          <div style="font-weight: 600;">Alex Rivera</div>
          <div style="font-size: 10px; color: var(--text-dim);">Senior Backend Dev</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Chat Area -->
  <div class="chat-area">
    <div class="chat-header">
      <div class="channel-info">
        <h2>#incident-war-room <span class="room-badge">Switch Room ID: incident-war-room-402</span></h2>
        <div style="font-size: 12px; color: var(--text-dim); margin-top: 3px;">
          Autonomous incident triage & collaborative remediation powered by Switch AI
        </div>
      </div>
      <div class="header-actions">
        <div class="incident-status-pill">
          <div class="pulse-dot"></div>
          P0 CRITICAL OUTAGE
        </div>
        <button class="btn" onclick="startIncidentSimulation()">▶️ Run Live Simulation</button>
      </div>
    </div>

    <div class="messages-container" id="messagesContainer">
      <div class="message-row">
        <div class="msg-avatar agent-msg-avatar">⚡</div>
        <div class="msg-body">
          <div class="msg-meta">
            <span class="msg-author">SwitchOps</span>
            <span class="msg-role-badge agent">SWITCH AI AGENT</span>
            <span class="msg-time">Just now</span>
          </div>
          <div class="msg-bubble agent-bubble">
            👋 Connected to Switch Room: <strong>#incident-war-room</strong>. Monitoring Sentry & Datadog webhooks. Click <strong>"Run Live Simulation"</strong> above to trigger the autonomous triage and hotfix workflow!
          </div>
        </div>
      </div>
    </div>

    <div class="typing-indicator" id="typingIndicator">
      <span style="font-weight: 600; color: #818cf8;">@SwitchOps</span> is analyzing git commits & generating hotfix
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>

    <div class="chat-footer">
      <div class="input-wrapper">
        <input type="text" id="chatInput" placeholder="Message #incident-war-room or type @SwitchOps postmortem..." onkeydown="handleKey(event)">
        <button class="btn" onclick="sendCustomMessage()">Send</button>
      </div>
    </div>
  </div>

  <script>
    const messagesContainer = document.getElementById('messagesContainer');
    const typingIndicator = document.getElementById('typingIndicator');

    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    function appendMessage(avatar, name, role, isAgent, content, isAlert = false) {
      const row = document.createElement('div');
      row.className = 'message-row';
      const roleClass = isAgent ? 'msg-role-badge agent' : 'msg-role-badge';
      const bubbleClass = isAlert ? 'msg-bubble alert-bubble' : (isAgent ? 'msg-bubble agent-bubble' : 'msg-bubble');
      const avatarClass = isAgent ? 'msg-avatar agent-msg-avatar' : 'msg-avatar';

      row.innerHTML = \`
        <div class="\${avatarClass}">\${avatar}</div>
        <div class="msg-body">
          <div class="msg-meta">
            <span class="msg-author">\${name}</span>
            <span class="\${roleClass}">\${role}</span>
            <span class="msg-time">\${new Date().toLocaleTimeString()}</span>
          </div>
          <div class="\${bubbleClass}">\${content}</div>
        </div>
      \`;
      messagesContainer.appendChild(row);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function startIncidentSimulation() {
      // 1. SRE Jordan sounds alarm
      appendMessage('👨‍💻', 'Jordan Rivera', 'Staff SRE Lead', false,
        '🚨 <strong>@channel</strong> Checkout failure rate is spiking to 15% right now in production! Sentry is blowing up with 500s. <strong>@SwitchOps</strong> investigate!', true);

      // Typing indicator
      typingIndicator.style.display = 'flex';
      await sleep(1800);
      typingIndicator.style.display = 'none';

      // 2. SwitchOps initial diagnosis & PR
      appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
        <div>
          <div style="font-weight: 700; color: #ef4444; margin-bottom: 6px;">🚨 P0 INCIDENT DETECTED by Sentry (INC-9042)</div>
          <div><strong>Service</strong>: <code>PaymentProcessorService</code> | <strong>Error</strong>: <code>TypeError: Cannot read properties of undefined (reading 'tier')</code></div>
          <div style="margin-top: 8px;">🎯 <strong>Root Cause Isolated (96% Confidence)</strong>:</div>
          <div>• <strong>Suspect File</strong>: <code>src/services/PaymentProcessor.ts:44</code></div>
          <div>• <strong>Breaking Commit</strong>: <code>7b4f91e</code> by <em>Alex Rivera</em></div>
          <div>• <strong>Explanation</strong>: Direct property access on <code>customer.subscription.tier</code> fails for guest checkouts without an active subscription.</div>
          
          <div class="code-box">
--- a/src/services/PaymentProcessor.ts<br>
+++ b/src/services/PaymentProcessor.ts<br>
@@ -44,3 +44,4 @@<br>
-  const userTier = customer.subscription.tier;<br>
+  // SwitchOps Safe Fix: Optional chaining with default fallback<br>
+  const userTier = customer?.subscription?.tier ?? 'STANDARD';
          </div>

          <div class="pr-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="pr-title">⚡ PR #973: fix(checkout): safely handle undefined subscription tier</span>
              <span class="pr-tag">✓ Tests Passing (42/42)</span>
            </div>
            <div style="font-size: 12px; color: var(--text-dim); margin-top: 6px;">
              Branch: <code>switchops/hotfix-inc-9042</code> • Automated reproduction test suite included.
            </div>
          </div>
          <div style="margin-top: 8px; color: #a5b4fc; font-weight: 600;">👉 Please review and approve PR #973 to deploy to production.</div>
        </div>
      \`);

      await sleep(2200);

      // 3. Alex responds
      appendMessage('👨‍🔧', 'Alex Rivera', 'Senior Backend Dev', false,
        'Shoot, that was my PR from 20 minutes ago! I assumed all customer objects had active subscriptions populated. Checking the hotfix PR link now... Verified, approved and merged!');

      await sleep(1500);

      // 4. Jordan asks for postmortem
      appendMessage('👨‍💻', 'Jordan Rivera', 'Staff SRE Lead', false,
        '@SwitchOps postmortem --include-action-items');

      typingIndicator.style.display = 'flex';
      await sleep(1800);
      typingIndicator.style.display = 'none';

      // 5. Postmortem delivery
      appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
        <div>
          <div style="font-weight: 700; color: #10b981; margin-bottom: 8px;">📄 Post-Mortem Report Generated (Incident INC-9042)</div>
          <div style="background: #111417; border: 1px solid #2e343b; border-radius: 6px; padding: 12px; font-size: 13px;">
            <div><strong>• Duration</strong>: 14 Minutes | <strong>Status</strong>: RESOLVED</div>
            <div><strong>• Customer Impact</strong>: ~185 customer transactions failed</div>
            <div><strong>• Revenue at Risk</strong>: $14,800 USD (Fully recovered)</div>
            <div style="margin-top: 8px; font-weight: 700;">Action Items:</div>
            <div>1. Add ESLint rule for strict optional chaining on nullable schemas (@alex)</div>
            <div>2. Introduce contract integration tests for guest customer checkouts (@sarah)</div>
            <div>3. Deploy SwitchOps pre-merge canary validation bot (@sre-team)</div>
          </div>
        </div>
      \`);
    }

    function handleKey(e) {
      if (e.key === 'Enter') sendCustomMessage();
    }

    function sendCustomMessage() {
      const input = document.getElementById('chatInput');
      const val = input.value.trim();
      if (!val) return;
      appendMessage('👤', 'You', 'Engineer', false, val);
      input.value = '';

      setTimeout(() => {
        if (val.toLowerCase().includes('status')) {
          appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true,
            '📊 <strong>Incident Status</strong>: All systems operational. Last incident INC-9042 was mitigated via PR #973.');
        } else if (val.toLowerCase().includes('postmortem')) {
          appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true,
            '📄 Post-Mortem is available for INC-9042: Duration: 14 min, Revenue at Risk: $14,800 USD recovered.');
        } else {
          appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true,
            '⚡ Acknowledged! SwitchOps is active in #incident-war-room.');
        }
      }, 700);
    }
  </script>
</body>
</html>`;
}
