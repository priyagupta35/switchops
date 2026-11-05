export function getWarRoomHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SwitchOps War Room | Powered by Switch AI</title>
  <style>
    :root {
      --bg-dark: #121519;
      --sidebar-bg: #0d0f12;
      --card-bg: #1a1e24;
      --card-border: #2a303c;
      --accent-color: #6366f1;
      --accent-gradient: linear-gradient(135deg, #6366f1, #8b5cf6);
      --accent-glow: rgba(99, 102, 241, 0.35);
      --text-main: #f1f5f9;
      --text-dim: #94a3b8;
      --danger: #ef4444;
      --success: #10b981;
      --warning: #f59e0b;
      --border-color: #242a35;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg-dark);
      color: var(--text-main);
      display: flex;
      height: 100vh;
      overflow: hidden;
      transition: background 0.3s ease;
    }
    /* Sidebar */
    .sidebar {
      width: 290px;
      background: var(--sidebar-bg);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .sidebar-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .switch-logo {
      width: 32px;
      height: 32px;
      background: var(--accent-gradient);
      box-shadow: 0 0 14px var(--accent-glow);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      color: #fff;
      font-size: 16px;
      transition: all 0.3s ease;
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
      margin-bottom: 4px;
      transition: background 0.15s;
    }
    .channel-item:hover {
      background: rgba(255, 255, 255, 0.04);
      color: #fff;
    }
    .channel-item.active {
      background: var(--card-bg);
      border-left: 3px solid var(--accent-color);
      color: #fff;
      font-weight: 600;
    }
    .channel-item .badge {
      margin-left: auto;
      background: var(--danger);
      color: #fff;
      font-size: 10px;
      font-weight: bold;
      padding: 2px 7px;
      border-radius: 10px;
    }
    .participant-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
    }
    .participant-item:hover { background: rgba(255, 255, 255, 0.03); }
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      position: relative;
    }
    .avatar.agent-avatar {
      background: var(--accent-gradient);
      box-shadow: 0 0 10px var(--accent-glow);
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

    /* Main War Room Area */
    .chat-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--bg-dark);
      position: relative;
    }
    .chat-header {
      padding: 14px 24px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--sidebar-bg);
    }
    .channel-info h2 {
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .room-badge {
      background: #202630;
      color: var(--text-dim);
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    /* Theme Palette Selector */
    .theme-picker {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #191e26;
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 4px 8px;
    }
    .theme-label {
      font-size: 11px;
      color: var(--text-dim);
      font-weight: 600;
      margin-right: 4px;
    }
    .theme-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
      transition: transform 0.15s, border-color 0.15s;
    }
    .theme-dot:hover { transform: scale(1.2); }
    .theme-dot.active { border-color: #fff; transform: scale(1.15); }
    .theme-indigo { background: #6366f1; }
    .theme-cyan { background: #06b6d4; }
    .theme-emerald { background: #10b981; }
    .theme-rose { background: #f43f5e; }
    .theme-amber { background: #f59e0b; }

    .incident-status-pill {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid var(--danger);
      color: #f87171;
      font-size: 12px;
      font-weight: 700;
      padding: 5px 12px;
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
    .btn {
      background: var(--accent-color);
      color: white;
      border: none;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn:hover {
      filter: brightness(1.1);
      box-shadow: 0 0 10px var(--accent-glow);
    }
    .btn-secondary {
      background: #242a35;
      color: var(--text-main);
    }
    .btn-secondary:hover { background: #2f3746; }

    /* Messages Stream */
    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .message-row {
      display: flex;
      gap: 14px;
      max-width: 960px;
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .msg-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #252b36;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }
    .msg-avatar.agent-msg-avatar {
      background: var(--accent-gradient);
      box-shadow: 0 0 14px var(--accent-glow);
    }
    .msg-body { flex: 1; }
    .msg-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .msg-author { font-weight: 700; font-size: 14px; }
    .msg-role-badge {
      background: #252b36;
      color: #cbd5e1;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .msg-role-badge.agent {
      background: rgba(99, 102, 241, 0.2);
      color: var(--accent-color);
      border: 1px solid var(--accent-color);
    }
    .msg-time { font-size: 11px; color: var(--text-dim); }
    .msg-bubble {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 14px 16px;
      font-size: 14px;
      line-height: 1.6;
    }
    .msg-bubble.alert-bubble {
      border-left: 4px solid var(--danger);
      background: rgba(239, 68, 68, 0.06);
    }
    .msg-bubble.agent-bubble {
      border-left: 4px solid var(--accent-color);
      background: rgba(99, 102, 241, 0.05);
    }
    .code-box {
      background: #0d1014;
      border: 1px solid var(--card-border);
      border-radius: 6px;
      padding: 10px 14px;
      font-family: Consolas, Monaco, monospace;
      font-size: 13px;
      color: #f1f5f9;
      margin: 10px 0;
      overflow-x: auto;
    }
    .pr-card {
      margin-top: 10px;
      background: #0f1318;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 14px;
    }
    .pr-title {
      font-size: 14px;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pr-tag {
      background: #10b981;
      color: white;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 600;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 12px 0;
    }
    .metric-card {
      background: #151921;
      border: 1px solid var(--card-border);
      border-radius: 6px;
      padding: 10px;
      text-align: center;
    }
    .metric-value {
      font-size: 18px;
      font-weight: 800;
      color: var(--accent-color);
    }
    .metric-label {
      font-size: 11px;
      color: var(--text-dim);
      margin-top: 2px;
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
    @keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }

    /* Quick Prompt Chips */
    .quick-chips {
      display: flex;
      gap: 8px;
      padding: 8px 24px 0 24px;
      background: var(--sidebar-bg);
      overflow-x: auto;
    }
    .chip {
      background: #1a202c;
      border: 1px solid var(--border-color);
      color: var(--text-dim);
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 14px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;
    }
    .chip:hover {
      background: var(--accent-color);
      color: #fff;
      border-color: var(--accent-color);
    }

    /* Input Footer */
    .chat-footer {
      padding: 12px 24px 16px 24px;
      background: var(--sidebar-bg);
      border-top: 1px solid var(--border-color);
    }
    .input-wrapper {
      display: flex;
      gap: 10px;
      background: #14171d;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 8px 14px;
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
      <div class="switch-logo" id="headerLogo">⚡</div>
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
      <div class="channel-item"># sre-triage</div>
    </div>

    <div class="sidebar-section">
      <div class="section-title">Active Teammates (Switch)</div>
      <div class="participant-item">
        <div class="avatar agent-avatar">🤖<div class="online-dot"></div></div>
        <div>
          <div style="font-weight: 600; color: var(--accent-color);">SwitchOps</div>
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

    <div class="sidebar-section" style="margin-top: auto; border-top: 1px solid var(--border-color);">
      <div style="font-size: 11px; color: var(--text-dim); line-height: 1.5;">
        🏆 <strong>Flip the Switch Hackathon</strong><br>
        Track 1: Best Business Workflow<br>
        Powered by Switch AI
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
        <!-- Live Color / Theme Palette -->
        <div class="theme-picker">
          <span class="theme-label">Theme:</span>
          <div class="theme-dot theme-indigo active" onclick="setTheme('indigo')" title="Indigo Violet"></div>
          <div class="theme-dot theme-cyan" onclick="setTheme('cyan')" title="Cyber Cyan"></div>
          <div class="theme-dot theme-emerald" onclick="setTheme('emerald')" title="Emerald Green"></div>
          <div class="theme-dot theme-rose" onclick="setTheme('rose')" title="Neon Rose"></div>
          <div class="theme-dot theme-amber" onclick="setTheme('amber')" title="Solar Amber"></div>
        </div>

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
            👋 Welcome to the <strong>Switch Incident War Room</strong>! I am <strong>@SwitchOps</strong>, your autonomous SRE teammate.<br><br>
            • Click <strong>"▶️ Run Live Simulation"</strong> above to watch a full P0 incident resolution unfold in real-time.<br>
            • Or use the <strong>quick chips</strong> or <strong>chat box below</strong> to ask me questions (e.g. <code>@SwitchOps status</code>, <code>@SwitchOps diff</code>, <code>@SwitchOps test</code>)!
          </div>
        </div>
      </div>
    </div>

    <div class="typing-indicator" id="typingIndicator">
      <span style="font-weight: 600; color: var(--accent-color);">@SwitchOps</span> is typing
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>

    <!-- Quick Chips for Easy Testing -->
    <div class="quick-chips">
      <span class="chip" onclick="quickAsk('@SwitchOps status')">📊 Check Status</span>
      <span class="chip" onclick="quickAsk('@SwitchOps diff')">🔍 Inspect Culprit Diff</span>
      <span class="chip" onclick="quickAsk('@SwitchOps test')">🧪 Run Reproduction Tests</span>
      <span class="chip" onclick="quickAsk('@SwitchOps pr')">⚡ View GitHub PR</span>
      <span class="chip" onclick="quickAsk('@SwitchOps postmortem')">📄 Generate Post-Mortem</span>
      <span class="chip" onclick="quickAsk('How does Switch help engineering teams?')">💡 How Switch Works</span>
    </div>

    <div class="chat-footer">
      <div class="input-wrapper">
        <input type="text" id="chatInput" placeholder="Message #incident-war-room or ask @SwitchOps anything..." onkeydown="handleKey(event)">
        <button class="btn" onclick="sendCustomMessage()">Send</button>
      </div>
    </div>
  </div>

  <script>
    const messagesContainer = document.getElementById('messagesContainer');
    const typingIndicator = document.getElementById('typingIndicator');

    // Theme switching logic
    const themes = {
      indigo: { accent: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', glow: 'rgba(99, 102, 241, 0.35)' },
      cyan: { accent: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', glow: 'rgba(6, 182, 212, 0.35)' },
      emerald: { accent: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #059669)', glow: 'rgba(16, 185, 129, 0.35)' },
      rose: { accent: '#f43f5e', gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)', glow: 'rgba(244, 63, 94, 0.35)' },
      amber: { accent: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', glow: 'rgba(245, 158, 11, 0.35)' }
    };

    function setTheme(themeName) {
      const t = themes[themeName];
      if (!t) return;
      document.documentElement.style.setProperty('--accent-color', t.accent);
      document.documentElement.style.setProperty('--accent-gradient', t.gradient);
      document.documentElement.style.setProperty('--accent-glow', t.glow);

      document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
      const activeDot = document.querySelector('.theme-' + themeName);
      if (activeDot) activeDot.classList.add('active');
    }

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
          <div>• <strong>Breaking Commit</strong>: <code>7b4f91e</code> by <em>Alex Rivera &lt;alex@acmepay.io&gt;</em></div>
          <div>• <strong>Explanation</strong>: Direct property access on <code>customer.subscription.tier</code> fails for guest checkouts without active subscriptions.</div>
          
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
          <div style="margin-top: 8px; color: #38bdf8; font-weight: 600;">👉 Please review and approve PR #973 to deploy to production.</div>
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
          
          <div class="metric-grid">
            <div class="metric-card">
              <div class="metric-value">14 min</div>
              <div class="metric-label">Mean Time to Resolve</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">185</div>
              <div class="metric-label">Failed Checkouts</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">$14,800</div>
              <div class="metric-label">Revenue Recovered</div>
            </div>
          </div>

          <div style="background: #0f1318; border: 1px solid var(--card-border); border-radius: 6px; padding: 12px; font-size: 13px;">
            <div style="font-weight: 700; margin-bottom: 4px;">Assigned Action Items:</div>
            <div>• [HIGH] Add ESLint rule for strict optional chaining on nullable schemas (Owner: <strong>@alex</strong>)</div>
            <div>• [HIGH] Introduce contract integration tests for guest customer checkouts (Owner: <strong>@sarah</strong>)</div>
            <div>• [MEDIUM] Deploy SwitchOps pre-merge canary validation bot (Owner: <strong>@sre-team</strong>)</div>
          </div>
        </div>
      \`);
    }

    function quickAsk(text) {
      const input = document.getElementById('chatInput');
      input.value = text;
      sendCustomMessage();
    }

    function handleKey(e) {
      if (e.key === 'Enter') sendCustomMessage();
    }

    async function sendCustomMessage() {
      const input = document.getElementById('chatInput');
      const val = input.value.trim();
      if (!val) return;
      appendMessage('👤', 'You', 'Engineer', false, val);
      input.value = '';

      typingIndicator.style.display = 'flex';
      await sleep(700);
      typingIndicator.style.display = 'none';

      const lower = val.toLowerCase();

      if (lower.includes('status')) {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          📊 <strong>Current Switch War Room Status</strong>:<br>
          • <strong>Room</strong>: <code>#incident-war-room (incident-war-room-402)</code><br>
          • <strong>Health</strong>: <code>OPERATIONAL</code> (Recovered from P0 INC-9042)<br>
          • <strong>Active AI Teammate</strong>: <code>@SwitchOps</code> (via Switch Agent Bridge)<br>
          • <strong>Connected Repositories</strong>: <code>acme-corp/payment-gateway</code>
        \`);
      } else if (lower.includes('diff') || lower.includes('blame') || lower.includes('commit')) {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          🔍 <strong>Culprit Commit Inspection (<code>7b4f91e</code>)</strong>:<br>
          • <strong>Author</strong>: Alex Rivera &lt;alex@acmepay.io&gt;<br>
          • <strong>File</strong>: <code>src/services/PaymentProcessor.ts:44</code><br>
          • <strong>Diff</strong>:
          <div class="code-box">
-   const discount = user.getDiscountRate();
+   // Added dynamic tier checking
+   const userTier = customer.subscription.tier; // 💥 Undefined for guest checkouts
+   const discount = this.calculateTierDiscount(userTier);
          </div>
        \`);
      } else if (lower.includes('test') || lower.includes('repro')) {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          🧪 <strong>Automated Regression Suite (<code>tests/repro_inc_9042.spec.ts</code>)</strong>:<br>
          <div class="code-box">
describe('Incident INC-9042 Reproduction', () => {
  it('should handle checkout when customer has no active subscription', async () => {
    const guestCustomer = { id: 'guest_99', subscription: undefined };
    const res = await processor.processCheckout(guestCustomer, 100);
    expect(res.status).toBe('SUCCESS'); // PASS (with SwitchOps hotfix)
  });
});
          </div>
          <span class="pr-tag">✓ 42 / 42 Tests Passed (Local CI)</span>
        \`);
      } else if (lower.includes('pr') || lower.includes('pull request')) {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          ⚡ <strong>Active Hotfix Pull Request</strong>:
          <div class="pr-card">
            <span class="pr-title">PR #973: fix(checkout): safely handle undefined subscription tier [INC-9042]</span>
            <div style="font-size: 12px; color: var(--text-dim); margin-top: 6px;">
              • Branch: <code>switchops/hotfix-inc-9042</code><br>
              • Base: <code>main</code><br>
              • Status: <strong style="color: #10b981;">Merged to production</strong>
            </div>
          </div>
        \`);
      } else if (lower.includes('postmortem') || lower.includes('summary')) {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          📄 <strong>Executive Post-Mortem Summary</strong>:<br>
          • <strong>Incident Duration</strong>: 14 Minutes<br>
          • <strong>Financial Impact</strong>: $14,800 USD revenue protected<br>
          • <strong>Mitigation</strong>: Replaced unchecked property lookup with optional chaining fallback.<br>
          • <strong>Action Items</strong>: 3 preventative engineering tasks logged in Jira/Linear.
        \`);
      } else if (lower.includes('switch') || lower.includes('how')) {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          💡 <strong>How Switch Works</strong>:<br>
          Instead of running as an isolated terminal tool, <strong>Switch</strong> connects coding agents into shared chat rooms (Slack, Teams, Discord).<br><br>
          1. <strong>Shared Context</strong>: Rooms preserve history across humans and AI.<br>
          2. <strong>Tool Integration</strong>: Agents can read GitHub, run tests, and post PRs directly into the discussion.<br>
          3. <strong>Collaborative SRE</strong>: Engineers verify and approve fixes right in their normal chat flow!
        \`);
      } else {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          ⚡ <strong>SwitchOps Received</strong>: "\${val}".<br>
          I am monitoring the repository. You can ask me to:
          • Check incident status (<code>@SwitchOps status</code>)<br>
          • Inspect breaking commit (<code>@SwitchOps diff</code>)<br>
          • View hotfix PR (<code>@SwitchOps pr</code>)<br>
          • Run test suite (<code>@SwitchOps test</code>)
        \`);
      }
    }
  </script>
</body>
</html>`;
}
