import http from 'http';
import { SwitchBridge } from './core/switch-bridge.ts';
import { SwitchOpsAgent } from './core/agent.ts';
import { SAMPLE_INCIDENTS } from './demo/sample-incident-data.ts';
import { getWarRoomHtml } from './ui/war-room-html.ts';

const PORT = parseInt(process.env.PORT || '3000', 10);
const ROOM_ID = process.env.SWITCH_ROOM_ID || 'incident-war-room-402';

async function bootstrap() {
  console.log(`Starting SwitchOps Agent Bridge for Room: ${ROOM_ID}...`);

  const bridge = new SwitchBridge(ROOM_ID, '#incident-war-room', 'slack');
  const agent = new SwitchOpsAgent(bridge);

  // Web server serving both the Visual War Room UI and the monitoring webhook API
  const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/room')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(getWarRoomHtml());
    } else if (req.method === 'POST' && req.url === '/webhook/alert') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const alert = parsed.alert || SAMPLE_INCIDENTS.payment_npe;
          console.log(`[SwitchOps Webhook] Received alert: ${alert.title}`);

          const response = await agent.triggerIncidentWorkflow(alert);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ACKNOWLEDGED', response }));
        } catch (error: any) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    } else if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'UP', room: ROOM_ID }));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is currently in use. Trying port ${PORT + 1}...`);
      server.listen(PORT + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`⚡ SWITCHOPS WAR ROOM IS READY IN YOUR BROWSER!`);
    console.log(`👉 Open: http://localhost:${PORT}`);
    console.log(`======================================================\n`);
  });
}

bootstrap().catch((err) => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
