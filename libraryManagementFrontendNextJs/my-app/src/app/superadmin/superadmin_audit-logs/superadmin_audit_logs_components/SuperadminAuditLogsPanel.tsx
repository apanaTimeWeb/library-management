// RESPONSIBILITY: Renders the SuperadminAuditLogsPanel component.
import React from 'react';
import { X, Shield } from 'lucide-react';
import type { SuperadminAuditLog, SuperadminAuditLogsPanelProps as Props } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_types/SuperadminAuditLogsTypes';
import { ActionBadge } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_components/SuperadminAuditLogsGrid';

export function SuperadminAuditLogsPanel({ log, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-bg-pageg-page/80 backdrop-blur-sm transition-opacity" />
      <div 
        className="relative w-full max-w-md bg-bg-pageg-card shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-border overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 flex-1 flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-primary" />
              <span className="font-mono text-xs text-text-secondary tracking-wider">{log.id}</span>
            </div>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-pageg-input transition-colors" 
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>

          <div className="bg-bg-pageg-input rounded-lg p-5 border border-border shadow-inner">
            <p className="text-sm text-text-primary leading-relaxed font-medium">{log.detail}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ['Timestamp',log.time],
              ['Performed By',log.user],
              ['Entity',log.entity],
              ['Target',log.target],
              ['IP Address',log.ip],
              ['Action',log.action]
            ].map(([label,val]) => (
              <div key={label} className="flex flex-col gap-1.5 p-1">
                <p className="text-xs font-bold text-text-disabled uppercase tracking-wider">{label}</p>
                <p className="text-sm font-mono text-text-primary truncate">{val}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-disabled uppercase tracking-wider">Log Status</span>
              <ActionBadge action={log.action} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
