// RESPONSIBILITY: Client view component rendering audit logs table, filters, copy IDs, and detail drawer (`Rule 1`, `Rule 8`, `Rule 19`, `Rule 49`).
'use client';
// DATA FLOW: useAdminAuditLogs -> AdminAuditLogsClient -> Table / Detail Drawer (`Rule 39`).

import { useState, useCallback } from 'react';
import { Search, ShieldAlert, ShieldCheck, Shield, AlertTriangle, Info, Copy, Check, X } from 'lucide-react';
import { useAdminAuditLogs } from '@/app/admin/admin_audit-logs/admin_audit-logs_hooks/useAdminAuditLogs';
import { AdminAuditLogsSkeleton } from '@/app/admin/admin_audit-logs/admin_audit-logs_components/AdminAuditLogsSkeleton';
import { AdminAuditLogsEmptyState } from '@/app/admin/admin_audit-logs/admin_audit-logs_components/AdminAuditLogsEmptyState';
import { AUDIT_LOG_TABS, SEVERITY_BADGE_CLASSES } from '@/app/admin/admin_audit-logs/admin_audit-logs_constants/admin_audit-logs_constants';
import { AuditLogRecord } from '@/app/admin/admin_audit-logs/admin_audit-logs_types/admin_audit-logs_types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { TablePagination } from '@/components/ui/table-pagination';

const SEVERITY_ICONS: Record<string, React.ReactNode> = {
  danger:  <ShieldAlert size={12} />,
  warning: <AlertTriangle size={12} />,
  info:    <Info size={12} />,
  success: <ShieldCheck size={12} />,
};

function SeverityCell({ data }: { data: AuditLogRecord }) {
  if (!data || !data.severity) return null;
  return (
    <Badge 
      variant="secondary" 
      className={`gap-1 h-6 px-2.5 ${SEVERITY_BADGE_CLASSES[data.severity] || 'bg-info/10 text-info border-none'}`}
    >
      {SEVERITY_ICONS[data.severity]} {data.severity.charAt(0).toUpperCase() + data.severity.slice(1)}
    </Badge>
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

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleRowClick = useCallback((log: AuditLogRecord) => {
    setSelectedLog(log);
  }, [setSelectedLog]);

  if (fetchState === 'loading' && logs.length === 0) {
    return <AdminAuditLogsSkeleton />;
  }

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* page Header */}
      <div className="border-b border-border pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Smart Library 360 <span className="opacity-50">›</span> Admin <span className="opacity-50">›</span> Audit Logs
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Audit Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Track all sensitive actions performed in the system.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search action, module, or user…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex items-center p-1 rounded-lg bg-muted/30 border border-border">
          {AUDIT_LOG_TABS.slice((page - 1) * limit, page * limit).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab 
                  ? 'bg-bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table or Empty State */}
      {logs.length === 0 ? (
        <AdminAuditLogsEmptyState onResetFilters={handleResetFilters} />
      ) : (
        <Card className="flex-1 min-h-96 shadow-sm border-border bg-card overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 font-semibold">Log ID</th>
                  <th className="px-6 py-3 font-semibold">Time</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                  <th className="px-6 py-3 font-semibold">Module</th>
                  <th className="px-6 py-3 font-semibold">Performed By</th>
                  <th className="px-6 py-3 font-semibold">Details</th>
                  <th className="px-6 py-3 font-semibold">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {logs.map((log) => (
                  <tr 
                    key={log.id} 
                    className="hover:bg-muted/30 transition-colors cursor-pointer group"
                    onClick={() => handleRowClick(log)}
                  >
                    <td className="px-6 py-3">
                      <IdCell value={log.id} />
                    </td>
                    <td className="px-6 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-3">
                      <ActionCell value={log.action} />
                    </td>
                    <td className="px-6 py-3 text-xs text-muted-foreground font-medium">
                      {log.module}
                    </td>
                    <td className="px-6 py-3">
                      <UserCell data={log} />
                    </td>
                    <td className="px-6 py-3 text-xs text-muted-foreground truncate max-w-xs">
                      {log.details}
                    </td>
                    <td className="px-6 py-3">
                      <SeverityCell data={log} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            page={page}
            limit={limit}
            totalItems={AUDIT_LOG_TABS.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      )}

      {/* Info Tip */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-info/10 border border-info/30 text-info shadow-sm">
        <Shield size={18} className="shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed text-info m-0 font-medium">
          Audit logs are retained for 90 days. Use the severity filter to quickly identify suspicious activity like deleted receipts or unauthorized access attempts. Click any row to inspect complete diagnostic details (`Rule 19`).
        </p>
      </div>

      {/* Detail Modal / Drawer (`Rule 19`) */}
      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="sm:max-w-xl">
          {selectedLog && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">#{selectedLog.id}</span>
                  <DialogTitle>{selectedLog.action}</DialogTitle>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 text-sm py-4">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Module</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedLog.module}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Severity</span>
                  <div className="mt-1">
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
                  <p className="text-sm text-foreground bg-muted/40 p-3 rounded-md mt-1 font-mono break-all shadow-inner">
                    {selectedLog.details}
                  </p>
                </div>
              </div>

              <DialogFooter className="border-t border-border pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedLog(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
