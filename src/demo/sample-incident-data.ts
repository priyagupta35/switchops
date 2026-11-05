import type { IncidentAlert } from '../core/types.ts';

export const SAMPLE_INCIDENTS: Record<string, IncidentAlert> = {
  payment_npe: {
    id: 'INC-9042',
    title: 'Checkout Payment Gateway 500 Spike',
    service: 'PaymentProcessorService',
    errorMessage: "TypeError: Cannot read properties of undefined (reading 'tier')",
    stackTrace: `TypeError: Cannot read properties of undefined (reading 'tier')
    at PaymentProcessor.processCheckout (src/services/PaymentProcessor.ts:44:38)
    at async RouteHandler.handlePost (src/api/checkout.ts:89:12)
    at async Server.processRequest (src/server.ts:142:5)`,
    severity: 'P0_CRITICAL',
    timestamp: new Date().toISOString(),
    source: 'SENTRY',
    environment: 'production',
  },
  auth_token_expiry: {
    id: 'INC-8812',
    title: 'OAuth Token Refresh Loop - High Latency',
    service: 'AuthService',
    errorMessage: 'TokenExpiredError: jwt expired before refresh hook',
    stackTrace: `TokenExpiredError: jwt expired
    at JWTManager.verifyToken (src/auth/JWTManager.ts:112:15)
    at async AuthMiddleware.authenticate (src/middleware/auth.ts:28:9)`,
    severity: 'P1_HIGH',
    timestamp: new Date().toISOString(),
    source: 'DATADOG',
    environment: 'production',
  },
};
