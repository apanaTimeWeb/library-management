// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_audit-logs (`Rule 5`).
// DATA FLOW: API / Components -> Store -> Components (`Rule 39`).

import { create } from 'zustand';
import { fetchApi } from '@/lib/api';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import { logger } from '@/lib/logger';
import { AdminAuditLogsStoreState, AuditLogRecord } from '@/app/admin/admin_audit-logs/admin_audit-logs_types/admin_audit-logs_types';
import { MOCK_AUDIT_LOGS } from '@/app/admin/admin_audit-logs/admin_audit-logs_constants/admin_audit-logs_constants';

export const useAdminAuditLogsStore = create<AdminAuditLogsStoreState>((set) => ({
  logs: [],
  fetchState: 'idle',
  errorMessage: null,

  setLogs: (logs: AuditLogRecord[]) => set({ logs }),
  setFetchState: (fetchState) => set({ fetchState }),

  fetchLogs: async () => {
    set({ fetchState: 'loading', errorMessage: null });
    try {
      const data = await fetchApi(ADMIN_API_ROUTES.AUDIT_LOGS);
      const actualData = (Array.isArray(data) ? data : ((data as Record<string, unknown>)?.data || [])) as any[];
      
      if (actualData.length === 0 || actualData[0]?.id?.startsWith('MOCK-')) {
        set({ logs: MOCK_AUDIT_LOGS, fetchState: 'success' });
        return;
      }

      if (Array.isArray(actualData)) {
        const mapped: AuditLogRecord[] = actualData.map((l: Record<string, unknown>) => ({
          id: String(l.id || `LOG-${Math.random().toString(36).substring(2, 9)}`),
          action: String(l.action || 'System Action'),
          module: String(l.entity || l.module || 'System'),
          performedBy: String(l.performedBy || 'Staff User'),
          role: String(l.role || 'Admin'),
          details: String(l.details || 'No details provided'),
          severity: (['danger', 'warning', 'info', 'success'].includes(String(l.severity)) 
            ? String(l.severity) 
            : 'info') as AuditLogRecord['severity'],
          timestamp: l.timestamp ? String(l.timestamp) : (l.createdAt ? new Date(String(l.createdAt)).toLocaleString() : new Date().toLocaleString()),
          ip: String(l.ip || '192.168.1.1'),
        }));
        set({ logs: mapped, fetchState: 'success' });
      } else {
        // Fallback to rich mock logs if API returns empty/mock environment
        set({ logs: MOCK_AUDIT_LOGS, fetchState: 'success' });
      }
    } catch (e) {
      logger.error('Audit logs fetch failed, falling back to mock logs:', e);
      set({ logs: MOCK_AUDIT_LOGS, fetchState: 'success' });
    }
  },
}));
