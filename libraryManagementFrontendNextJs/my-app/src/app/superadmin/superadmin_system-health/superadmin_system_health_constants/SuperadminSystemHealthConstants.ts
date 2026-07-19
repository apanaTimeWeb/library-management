// RESPONSIBILITY: Renders or handles logic for SuperadminSystemHealthConstants.ts.
import type { SuperadminSystemHealthDataResponse } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_types/SuperadminSystemHealthTypes';

export const SUPERADMIN_SYSTEM_HEALTH_MOCK_DATA: SuperadminSystemHealthDataResponse = {
  infrastructure: [
    { label: 'Web Servers',                  sub: '4 Nodes (aws-ap-south-1)',  val: 'Healthy (99.99%)', pct: 100, colorKey: 'success' },
    { label: 'API Latency (REST + GraphQL)', sub: 'Average P95 Delay',         val: '45ms',             pct: 25,  colorKey: 'info' },
  ],
  databases: [
    { label: 'Postgres Primary Cluster', sub: 'Read/Write Ops',    val: 'Operational',  pct: 100, colorKey: 'success' },
    { label: 'Redis Caching Servers',    sub: 'Memory Allocation', val: '78% Utilized', pct: 78,  colorKey: 'warning' },
  ],
  gateways: [
    { n: 'WhatsApp Cloud API', st: 'Connected',  dotColorKey: 'success' },
    { n: 'Razorpay Gateway',   st: 'Connected',  dotColorKey: 'success' },
    { n: 'AWS S3 Backups',     st: 'Syncing...', dotColorKey: 'info' },
  ],
};

export const SUPERADMIN_SYSTEM_HEALTH_COLOR_TEXT_CLS: Record<string, string> = {
  success: 'text-success',
  info:    'text-info',
  warning: 'text-warning',
  danger:  'text-danger',
};

export const SUPERADMIN_SYSTEM_HEALTH_COLOR_FILL_CLS: Record<string, string> = {
  success: 'bg-success',
  info:    'bg-info',
  warning: 'bg-warning',
  danger:  'bg-danger',
};
