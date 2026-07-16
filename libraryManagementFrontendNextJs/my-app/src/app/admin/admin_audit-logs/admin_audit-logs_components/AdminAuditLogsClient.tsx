'use client';

// RESPONSIBILITY: Client view component rendering audit logs AG Grid table, filters, copy IDs, and detail drawer (`Rule 1`, `Rule 8`, `Rule 19`, `Rule 49`).
// DATA FLOW: useAdminAuditLogs -> AdminAuditLogsClient -> AG Grid / Detail Drawer (`Rule 39`).

import { useState, useMemo, useCallback } from 'react';
import { Search, ShieldAlert, ShieldCheck, Shield, AlertTriangle, Info, Copy, Check, X } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { useAdminAuditLogs } from '@/app/admin/admin_audit-logs/admin_audit-logs_hooks/useAdminAuditLogs';
import { AdminAuditLogsSkeleton } from '@/app/admin/admin_audit-logs/admin_audit-logs_components/AdminAuditLogsSkeleton';
import { AdminAuditLogsEmptyState } from '@/app/admin/admin_audit-logs/admin_audit-logs_components/AdminAuditLogsEmptyState';
import { AUDIT_LOG_TABS, SEVERITY_BADGE_CLASSES } from '@/app/admin/admin_audit-logs/admin_audit-logs_constants/admin_audit-logs_constants';
import { AuditLogRecord } from '@/app/admin/admin_audit-logs/admin_audit-logs_types/admin_audit-logs_types';
import toast from 'react-hot-toast';

ModuleRegistry.registerModules([AllCommunityModule]);

const SEVERITY_ICONS: Record<string, React.ReactNode> = {
  danger:  <ShieldAlert size={12} />,
  warning: <AlertTriangle size={12} />,
  info:    <Info size={12} />,
  success: <ShieldCheck size={12} />,
};

function SeverityCell({ data }: { data: AuditLogRecord }) {
  if (!data || !data.severity) return null;
  return (
    <span className={SEVERITY_BADGE_CLASSES[data.severity] || 'admin-badge admin-badge-info'}>
      {SEVERITY_ICONS[data.severity]} {data.severity.charAt(0).toUpperCase() + data.severity.slice(1)}
    </span>
  );
}

function ActionCell({ value }: { value: string }) {
  return <span className="font-semibold text-foreground">{value}</span>;
}

function UserCell({ data }: { data: AuditLogRecord }) {
  if (!data) return null;
  return (
    <div className="flex flex-col justify-center h-full leading-tight">
      <span className="font-medium text-sm text-foreground">{data.performedBy}</span>
      <span className="text-xs text-muted-foreground">{data.role}</span>
    </div>
  );
}

function IdCell({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value || '');
    setCopied(true);
    toast.success(`Log ID copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <span>#{value}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy log ID"
        className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title="Copy Log ID"
      >
        {copied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
      </button>
    </div>
  );
}

export function AdminAuditLogsClient() {
  const {
    logs,
    fetchState,
    activeTab,
    searchInput,
    selectedLog,
    setActiveTab,
    setSearchInput,
    setSelectedLog,
    handleResetFilters,
  } = useAdminAuditLogs();

  const colDefs = useMemo(() => [
    { field: 'id',          headerName: 'LOG ID',       width: 110, cellRenderer: IdCell },
    { field: 'timestamp',   headerName: 'TIME',         flex: 1.2,  minWidth: 130, cellClass: 'text-xs text-muted-foreground' },
    { field: 'action',      headerName: 'ACTION',       flex: 2,    minWidth: 180, cellRenderer: ActionCell },
    { field: 'module',      headerName: 'MODULE',       flex: 1,    minWidth: 110, cellClass: 'text-xs text-muted-foreground font-medium' },
    { field: 'performedBy', headerName: 'PERFORMED BY', flex: 1.5,  minWidth: 160, cellRenderer: UserCell },
    { field: 'details',     headerName: 'DETAILS',      flex: 2.5,  minWidth: 260, cellClass: 'text-xs text-muted-foreground truncate' },
    { field: 'severity',    headerName: 'SEVERITY',     flex: 1,    minWidth: 130, cellRenderer: SeverityCell },
  ], []);

  const handleRowClick = useCallback((event: { data?: AuditLogRecord }) => {
    if (event.data) {
      setSelectedLog(event.data);
    }
  }, [setSelectedLog]);

  if (fetchState === 'loading' && logs.length === 0) {
    return <AdminAuditLogsSkeleton />;
  }

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="admin-page-header border-b border-border pb-4">
        <div>
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Audit Logs</p>
          <h1 className="admin-page-title">Audit Logs</h1>
          <p className="admin-page-subtitle">Track all sensitive actions performed in the system.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="admin-input pl-9"
            placeholder="Search action, module, or user…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="admin-tab-bar">
          {AUDIT_LOG_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`admin-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* AG Grid Table or Empty State */}
      {logs.length === 0 ? (
        <AdminAuditLogsEmptyState onResetFilters={handleResetFilters} />
      ) : (
        <div className="admin-table-wrapper flex-1 min-h-[450px]">
          <AgGridReact
            theme={gridTheme}
            rowData={logs}
            columnDefs={colDefs as never}
            rowHeight={54}
            headerHeight={40}
            suppressMovableColumns
            suppressCellFocus
            defaultColDef={{ resizable: false, sortable: true }}
            onRowClicked={handleRowClick}
            rowClass="cursor-pointer hover:bg-muted/30 transition-colors"
          />
        </div>
      )}

      {/* Info Tip */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-info/10 border border-info/30 text-info">
        <Shield size={18} className="shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed text-muted-foreground m-0">
          Audit logs are retained for 90 days. Use the severity filter to quickly identify suspicious activity like deleted receipts or unauthorized access attempts. Click any row to inspect complete diagnostic details (`Rule 19`).
        </p>
      </div>

      {/* Detail Modal / Drawer (`Rule 19`) */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-50">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">#{selectedLog.id}</span>
                <h3 className="font-semibold text-lg text-foreground">{selectedLog.action}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                aria-label="Close modal"
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Module</span>
                <p className="font-medium text-foreground mt-0.5">{selectedLog.module}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Severity</span>
                <div className="mt-0.5">
                  <SeverityCell data={selectedLog} />
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Performed By</span>
                <p className="font-medium text-foreground mt-0.5">{selectedLog.performedBy} ({selectedLog.role})</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">IP Address</span>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">{selectedLog.ip}</p>
              </div>
              <div className="col-span-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timestamp</span>
                <p className="font-medium text-foreground mt-0.5">{selectedLog.timestamp}</p>
              </div>
              <div className="col-span-2 border-t border-border pt-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event Details</span>
                <p className="text-sm text-foreground bg-muted/40 p-3 rounded-md mt-1 font-mono break-all">
                  {selectedLog.details}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
