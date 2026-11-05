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

    /* Human-in-the-Loop Permission Guardrail Card */
    .guardrail-card {
      margin-top: 14px;
      background: #181d24;
      border: 1.5px solid var(--warning);
      border-radius: 8px;
      padding: 14px 16px;
      box-shadow: 0 0 16px rgba(245, 158, 11, 0.15);
      animation: fadeIn 0.4s ease;
    }
    .guardrail-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .guardrail-title {
      font-weight: 800;
      font-size: 13px;
      color: var(--warning);
      display: flex;
      align-items: center;
      gap: 6px;
      letter-spacing: 0.5px;
    }
    .guardrail-badge {
      background: rgba(245, 158, 11, 0.18);
      border: 1px solid var(--warning);
      color: #fbbf24;
      font-size: 10px;
      font-weight: bold;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .guardrail-desc {
      font-size: 13px;
      color: #cbd5e1;
      margin-bottom: 10px;
      line-height: 1.5;
    }
    .guardrail-meta {
      display: flex;
      gap: 16px;
      font-size: 12px;
      color: var(--text-dim);
      background: #101317;
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    .guardrail-meta strong { color: #f1f5f9; }
    .guardrail-actions {
      display: flex;
      gap: 10px;
    }
    .btn-approve {
      background: #10b981;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-approve:hover {
      background: #059669;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
    }
    .btn-reject {
      background: #334155;
      color: #cbd5e1;
      border: 1px solid var(--border-color);
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-reject:hover { background: #475569; }
    .guardrail-status-banner {
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .status-approved {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      color: #34d399;
    }
    .status-rejected {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid #ef4444;
      color: #f87171;
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
        🛡️ <strong>Human-in-the-Loop</strong><br>
        Autonomous agent guardrails active.<br>
        Human permission required for production merges.
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

        <div class="incident-status-pill" id="statusPill">
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
            🔒 <strong>Safety Guardrails Active</strong>: I will never deploy or merge to production without explicit human permission in this room.<br>
            • Click <strong>"▶️ Run Live Simulation"</strong> above to see the full incident response, root cause analysis, and the <strong>Human Permission Gate</strong> in action!
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
      <span class="chip" onclick="quickAsk('Does Switch require human approval before deployment?')">🛡️ Guardrail Rules</span>
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
    let hasApprovedDeploy = false;

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

      // 2. SwitchOps initial diagnosis, PR & HUMAN PERMISSION GATE
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

          <!-- HUMAN PERMISSION GATE -->
          <div class="guardrail-card" id="guardrailGate">
            <div class="guardrail-header">
              <span class="guardrail-title">🛡️ SWITCH GUARDRAIL: HUMAN PERMISSION REQUIRED</span>
              <span class="guardrail-badge">AWAITING APPROVAL</span>
            </div>
            <div class="guardrail-desc">
              Switch policy prevents autonomous deployment to production without verified human consent. Review the hotfix patch and authorize deployment:
            </div>
            <div class="guardrail-meta">
              <span><strong>Target:</strong> PaymentProcessorService (production)</span>
              <span><strong>Action:</strong> Merge PR #973 & Deploy Canary</span>
              <span><strong>Risk Level:</strong> <span style="color: #ef4444; font-weight: bold;">HIGH</span></span>
            </div>
            <div class="guardrail-actions" id="guardrailActions">
              <button class="btn-approve" onclick="handleHumanApproval(true)">✅ Approve & Execute Deployment</button>
              <button class="btn-reject" onclick="handleHumanApproval(false)">❌ Reject & Request Changes</button>
            </div>
          </div>
        </div>
      \`);
    }

    async function handleHumanApproval(approved) {
      const actionsDiv = document.getElementById('guardrailActions');
      if (!actionsDiv) return;

      if (approved) {
        hasApprovedDeploy = true;
        actionsDiv.innerHTML = \`
          <div class="guardrail-status-banner status-approved">
            ✅ AUTHORIZED BY: Jordan Rivera (Staff SRE Lead) at \${new Date().toLocaleTimeString()}
          </div>
        \`;

        // Alex acknowledges
        appendMessage('👨‍🔧', 'Alex Rivera', 'Senior Backend Dev', false,
          'Verified the patch! I approved the PR on GitHub too. Deploying now.');

        // Typing indicator
        typingIndicator.style.display = 'flex';
        await sleep(1500);
        typingIndicator.style.display = 'none';

        // SwitchOps proceeds with deployment execution
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          🚀 <strong>Production Deployment Executed (Authorized by SRE Lead)</strong>:<br>
          • Merged PR #973 into <code>main</code> branch.<br>
          • Canary pods deployed to AWS us-east-1.<br>
          • <strong>Health Check</strong>: Checkout error rate dropped from 15% ➔ <strong>0.00%</strong>.<br>
          • Incident INC-9042 status updated to <strong>RESOLVED</strong>.
        \`);

        // Update top status pill to green
        const pill = document.getElementById('statusPill');
        if (pill) {
          pill.style.background = 'rgba(16, 185, 129, 0.15)';
          pill.style.borderColor = '#10b981';
          pill.style.color = '#34d399';
          pill.innerHTML = '✓ INCIDENT RESOLVED';
        }

        await sleep(1500);

        // Jordan asks for postmortem
        appendMessage('👨‍💻', 'Jordan Rivera', 'Staff SRE Lead', false,
          '@SwitchOps postmortem --include-action-items');

        typingIndicator.style.display = 'flex';
        await sleep(1600);
        typingIndicator.style.display = 'none';

        // Postmortem
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
      } else {
        actionsDiv.innerHTML = \`
          <div class="guardrail-status-banner status-rejected">
            ❌ REJECTED BY: Human Operator at \${new Date().toLocaleTimeString()}
          </div>
        \`;
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true,
          '⚠️ <strong>Deployment Aborted</strong>: Hotfix deployment was halted per human instruction. No changes were applied to production.');
      }
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
          • <strong>Health</strong>: <code>\${hasApprovedDeploy ? 'OPERATIONAL' : 'P0_TRIAGE'}</code><br>
          • <strong>Active Guardrail</strong>: <code>Human Permission Required for Merges</code><br>
          • <strong>Active AI Teammate</strong>: <code>@SwitchOps</code> (via Switch Agent Bridge)
        \`);
      } else if (lower.includes('approval') || lower.includes('guardrail') || lower.includes('permission')) {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          🛡️ <strong>Switch Human-in-the-Loop Guardrail Policy</strong>:<br>
          Switch operates under strict <strong>Human-in-the-Loop oversight</strong>:<br>
          1. <strong>Read Operations</strong> (git log, stack trace parsing, test execution) are autonomous.<br>
          2. <strong>Destructive Operations</strong> (merging PRs, deploying to production, altering infra) <strong>REQUIRE explicit human sign-off</strong> in this channel.<br>
          3. Engineers must click <strong>[Approve]</strong> or explicitly type authorization before any code reaches production.
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
              • Guardrail Status: <strong>Awaiting Human Sign-off</strong>
            </div>
          </div>
        \`);
      } else if (lower.includes('postmortem') || lower.includes('summary')) {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          📄 <strong>Executive Post-Mortem Summary</strong>:<br>
          • <strong>Incident Duration</strong>: 14 Minutes<br>
          • <strong>Financial Impact</strong>: $14,800 USD revenue protected<br>
          • <strong>Mitigation</strong>: Replaced unchecked property lookup with optional chaining fallback.<br>
          • <strong>Human Approver</strong>: Staff SRE Lead Jordan Rivera.
        \`);
      } else {
        appendMessage('🤖', 'SwitchOps', 'SWITCH AI AGENT', true, \`
          ⚡ <strong>SwitchOps Received</strong>: "\${val}".<br>
          I am monitoring the repository. You can ask me to:
          • Check incident status (<code>@SwitchOps status</code>)<br>
          • Inspect breaking commit (<code>@SwitchOps diff</code>)<br>
          • View guardrail rules (<code>@SwitchOps guardrails</code>)
        \`);
      }
    }
  </script>
</body>
</html>`;
}
