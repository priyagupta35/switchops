import http from 'http';
import { SwitchBridge } from './core/switch-bridge.ts';
import { SwitchOpsAgent } from './core/agent.ts';
import { SAMPLE_INCIDENTS } from './demo/sample-incident-data.ts';
import { getWarRoomHtml } from './ui/war-room-html.ts';

const PORT = parseInt(process.env.PORT || '3000', 10);
const ROOM_ID = process.env.SWITCH_ROOM_ID || 'incident-war-room-402';

// Connected SSE clients for live real-time browser updates
const sseClients: http.ServerResponse[] = [];

function broadcastEvent(type: string, data: any) {
  const payload = `data: ${JSON.stringify({ type, data, timestamp: new Date().toISOString() })}\n\n`;
  sseClients.forEach((client) => {
    try {
      client.write(payload);
    } catch {
      // client disconnected
    }
  });
}

async function bootstrap() {
  console.log(`Starting SwitchOps Agent Bridge for Room: ${ROOM_ID}...`);

  const bridge = new SwitchBridge(ROOM_ID, '#incident-war-room-402', 'slack');
  const agent = new SwitchOpsAgent(bridge);

  const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    // Serve Slack-style War Room UI
    if (req.method === 'GET' && (req.url === '/' || req.url === '/room')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(getWarRoomHtml());
      return;
    }

    // SSE Stream for real-time live war room updates
    if (req.method === 'GET' && req.url === '/api/events') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });
      res.write(`data: ${JSON.stringify({ type: 'CONNECTED', room: ROOM_ID })}\n\n`);
      sseClients.push(res);

      req.on('close', () => {
        const index = sseClients.indexOf(res);
        if (index !== -1) sseClients.splice(index, 1);
      });
      return;
    }

    // Webhook endpoint to receive alerts from TechPulse, Sentry, Datadog
    if (req.method === 'POST' && req.url === '/webhook/alert') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const alert = parsed.alert || SAMPLE_INCIDENTS.techpulse_register_crash;
          console.log(`[SwitchOps Webhook] Received Live Alert: ${alert.title}`);

          // Broadcast alert arrival to the live Slack War Room
          broadcastEvent('ALERT_RECEIVED', alert);

          // Agent investigates & generates fix
          const response = await agent.triggerIncidentWorkflow(alert);
          const state = bridge.getState();

          // Broadcast analysis & PR to the browser
          broadcastEvent('ANALYSIS_COMPLETE', {
            analysis: state.activeAnalysis,
            pr: state.activePR,
            response,
          });

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ACKNOWLEDGED', alertId: alert.id, pr: state.activePR }));
        } catch (error: any) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
      return;
    }

    // Health check endpoint
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'UP', room: ROOM_ID, activeClients: sseClients.length }));
      return;
    }

    res.writeHead(404);
    res.end('Not Found');
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is in use. Retrying on port ${PORT + 1}...`);
      server.listen(PORT + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(PORT, () => {
    console.log(`\n================================================================`);
    console.log(`⚡ SWITCHOPS ENTERPRISE WAR ROOM ACTIVE`);
    console.log(`👉 Open in browser: http://localhost:${PORT}`);
    console.log(`👉 Live Webhook API: http://localhost:${PORT}/webhook/alert`);
    console.log(`================================================================\n`);
  });
}

bootstrap().catch((err) => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
