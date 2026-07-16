import React from 'react';
import { X, Shield } from 'lucide-react';
import type { SuperadminAuditLog } from '../superadmin_audit_logs_types/SuperadminAuditLogsTypes';
import { ActionBadge } from './SuperadminAuditLogsGrid';

interface Props {
  log: SuperadminAuditLog;
  onClose: () => void;
}

export function SuperadminAuditLogsPanel({ log, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-[var(--bg-page)]/80 backdrop-blur-sm transition-opacity" />
      <div 
        className="relative w-full max-w-md bg-[var(--bg-card)] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-[var(--border)] overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 flex-1 flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-[var(--primary)]" />
              <span className="font-mono text-xs text-[var(--text-secondary)] tracking-wider">{log.id}</span>
            </div>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors" 
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>

          <div className="bg-[var(--bg-input)] rounded-[var(--radius-lg)] p-5 border border-[var(--border)] shadow-inner">
            <p className="text-sm text-[var(--text-primary)] leading-relaxed font-medium">{log.detail}</p>
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
                <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">{label}</p>
                <p className="text-[13px] font-mono text-[var(--text-primary)] truncate">{val}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-[var(--border)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Log Status</span>
              <ActionBadge action={log.action} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
