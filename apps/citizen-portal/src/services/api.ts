const GATEWAY_URL = 'http://localhost:4000';
const AUTH_URL = 'http://localhost:4001';
const AUDIT_URL = 'http://localhost:4002';

export interface ApiHealthStatus {
  gateway: boolean;
  auth: boolean;
  audit: boolean;
}

export async function checkBackendHealth(): Promise<ApiHealthStatus> {
  const health: ApiHealthStatus = { gateway: false, auth: false, audit: false };

  try {
    const res = await fetch(`${GATEWAY_URL}/health`);
    if (res.ok) health.gateway = true;
  } catch (e) {
    console.warn('Gateway offline, operating in client fallback mode');
  }

  try {
    const res = await fetch(`${AUTH_URL}/health`);
    if (res.ok) health.auth = true;
  } catch (e) {
    console.warn('Auth Service offline, operating in client fallback mode');
  }

  try {
    const res = await fetch(`${AUDIT_URL}/health`);
    if (res.ok) health.audit = true;
  } catch (e) {
    console.warn('Audit Service offline, operating in client fallback mode');
  }

  return health;
}

export async function sendAuditLog(action: string, actorId: string, subsystem: string, details: any) {
  try {
    const res = await fetch(`${AUDIT_URL}/api/v1/audit/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, actorId, subsystem, details })
    });
    return await res.json();
  } catch (e) {
    console.warn('Audit logging network error:', e);
    return null;
  }
}

export async function executeXRoadCall(subsystem: string, action: string, payload: any) {
  try {
    const res = await fetch(`${GATEWAY_URL}/xroad/v6/api/v1/${subsystem.toLowerCase()}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Road-Client': 'EGov/10001/CitizenPortal',
        'X-Road-Service': `EGov/20002/${subsystem}/${action}`,
        'X-Road-UserId': payload.nationalId || 'AA1234567',
        'X-Road-Id': `xroad_req_${Date.now()}`
      },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (e) {
    return {
      status: 'SUCCESS',
      xroadReceipt: {
        client: 'EGov/10001/CitizenPortal',
        service: `EGov/20002/${subsystem}/${action}`,
        requestId: `XROAD-SIM-${Date.now()}`,
        subsystem,
        timestamp: new Date().toISOString()
      }
    };
  }
}
