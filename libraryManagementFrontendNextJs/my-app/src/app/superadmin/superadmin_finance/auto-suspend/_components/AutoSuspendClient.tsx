// RESPONSIBILITY: Renders the AutoSuspendClient component.
'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Settings, Ban, RotateCcw, Bell, Save, UserCheck, ShieldAlert, X } from 'lucide-react';
import { useAutoSuspendClient } from './useAutoSuspendClient';

export function AutoSuspendClient() {
  const {
    config, suspended, configLoading, suspendedLoading,
    editing, updatePending, configForm, onSaveConfig, openEditConfig, cancelEditConfig,
    restoreDialog, setRestoreDialog, restorePending, restoreForm, onRestoreStudent,
    openRestoreDialog, sendReminder
  } = useAutoSuspendClient();

  const KPI_CARDS = [
    { label: 'Days Before Suspend', value: configLoading ? '—' : config?.daysBeforeSuspend, icon: Settings, variant: 'default' },
    { label: 'Currently Suspended', value: configLoading ? '—' : config?.currentlySuspended ?? 0, icon: Ban, variant: 'danger' },
    { label: 'Auto-Restored (Month)', value: configLoading ? '—' : config?.autoRestoredThisMonth ?? 0, icon: RotateCcw, variant: 'default' },
    { label: 'Manual Restores', value: configLoading ? '—' : config?.manualRestores ?? 0, icon: UserCheck, variant: 'default' },
  ] as const;

  return (
    <div className="space-y-6">
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#1A1A2E', color: '#F0F0FF', border: '1px solid #2A2A3E', fontSize: 13 }
      }} />

      <div>
        <h1 className="text-[22px] font-bold text-text-primary">Auto-Suspend Policy</h1>
        <p className="text-[12px] text-text-secondary">Manage automatic suspension and student restoration.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {KPI_CARDS.map(({ label, value, icon: Icon, variant }) => (
          <div key={label} className={`bg-card p-5 rounded-[var(--radius-lg)] border ${variant === 'danger' ? 'border-danger/20' : 'border-border'} flex flex-col justify-between`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[12px] font-bold uppercase tracking-wider ${variant === 'danger' ? 'text-danger' : 'text-text-secondary'}`}>{label}</span>
              <Icon size={16} className={variant === 'danger' ? 'text-danger' : 'text-text-secondary'} />
            </div>
            <p className={`text-[24px] font-black tracking-tight ${variant === 'danger' ? 'text-danger' : 'text-text-primary'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Policy Config */}
      <div className="bg-card rounded-[var(--radius-lg)] border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[14px] text-text-primary font-bold">
            <ShieldAlert size={18} className="text-text-secondary" />
            Policy Configuration
          </div>
          {!editing && (
            <button className="px-3 py-1.5 bg-input border border-border text-text-primary text-[12px] font-bold rounded-[var(--radius-md)] hover:bg-border transition-colors cursor-pointer" onClick={openEditConfig}>
              Edit
            </button>
          )}
        </div>
        {configLoading ? (
          <div className="h-10 w-full bg-skeleton-base rounded animate-pulse" />
        ) : editing ? (
          <form onSubmit={onSaveConfig} className="space-y-4 max-w-sm">
            <div>
              <label className="text-[12px] font-bold text-text-secondary block mb-1">Days before auto-suspend <span className="text-danger">*</span></label>
              <input 
                type="number" 
                {...configForm.register('daysBeforeSuspend', { valueAsNumber: true })}
                className={`w-full bg-input border ${configForm.formState.errors.daysBeforeSuspend ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
              />
              {configForm.formState.errors.daysBeforeSuspend && <p className="text-danger text-[11px] mt-1">{configForm.formState.errors.daysBeforeSuspend.message}</p>}
              <p className="text-[11px] text-text-secondary mt-1">Students overdue beyond this period are automatically suspended.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex items-center gap-1 bg-success text-success-foreground px-4 py-2 rounded-[var(--radius-md)] text-[12px] font-bold hover:brightness-95 transition-all cursor-pointer disabled:opacity-50" disabled={updatePending}>
                <Save size={14} /> {updatePending ? 'Saving...' : 'Save Config'}
              </button>
              <button type="button" className="bg-transparent border border-border text-text-primary px-4 py-2 rounded-[var(--radius-md)] text-[12px] font-bold hover:bg-input transition-colors cursor-pointer" onClick={cancelEditConfig}>Cancel</button>
            </div>
          </form>
        ) : (
          <p className="text-[14px] text-text-secondary bg-primary/5 p-4 rounded-[var(--radius-md)] border border-primary/10">
            Students are automatically suspended after <strong className="text-text-primary text-[16px]">{config?.daysBeforeSuspend}</strong> days of non-payment past due date.
          </p>
        )}
      </div>

      {/* Suspended Students Table */}
      <div className="bg-card rounded-[var(--radius-lg)] border border-border overflow-x-auto">
        <div className="flex items-center gap-2 p-4 border-b border-border bg-page/50">
          <Ban size={18} className="text-danger" />
          <span className="text-[14px] text-text-primary font-bold">Suspended Students</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 uppercase text-[12px] font-semibold text-text-secondary border-b border-border">
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Seat</th>
              <th className="py-3 px-4">Shift</th>
              <th className="py-3 px-4">Last Payment Date</th>
              <th className="py-3 px-4">Days Overdue</th>
              <th className="py-3 px-4">Suspended Since</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suspendedLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 w-16 bg-skeleton-base rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : suspended.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <div className="text-4xl">🔓</div>
                    <p className="text-[16px] text-text-secondary">No students currently suspended.</p>
                  </div>
                </td>
              </tr>
            ) : (
              suspended.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-text-primary text-[14px]">{s.studentName}</div>
                    <div className="text-[12px] text-text-secondary">{s.smartId}</div>
                  </td>
                  <td className="py-3 px-4 text-[14px] font-medium text-text-primary">{s.seat}</td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">{s.shift}</span>
                  </td>
                  <td className="py-3 px-4 text-[12px] text-text-secondary">—</td>
                  <td className="py-3 px-4">
                    <span className="text-danger font-bold text-[14px]">{s.daysOverdue}d</span>
                  </td>
                  <td className="py-3 px-4 text-[12px] text-text-secondary">{s.suspendedSince}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="bg-input border border-border text-text-primary px-2.5 py-1 rounded-[var(--radius-md)] text-[12px] font-bold flex items-center gap-1 hover:bg-border transition-colors cursor-pointer"
                        onClick={() => sendReminder(s.studentName)}
                      >
                        <Bell size={12} /> 📱 Reminder
                      </button>
                      <button
                        className="bg-success text-success-foreground px-2.5 py-1 rounded-[var(--radius-md)] text-[12px] font-bold flex items-center gap-1 hover:brightness-95 transition-colors cursor-pointer"
                        onClick={() => openRestoreDialog(s)}
                      >
                        <RotateCcw size={12} /> Manual Restore
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {restoreDialog && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setRestoreDialog(null)} />
          <div className="relative w-full max-w-md bg-card rounded-[var(--radius-xl)] shadow-2xl overflow-hidden p-7 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[18px] font-bold text-text-primary">Restore Student</h2>
              <button className="text-text-secondary hover:text-danger transition-colors cursor-pointer" onClick={() => setRestoreDialog(null)}><X size={18} /></button>
            </div>
            
            <p className="text-[14px] text-text-secondary mb-4">Manually restore access for <strong className="text-text-primary">{restoreDialog.name}</strong>?</p>
            
            <form onSubmit={onRestoreStudent}>
              <div className="mb-6">
                <label className="text-[12px] font-bold text-text-secondary block mb-1">Override reason <span className="text-danger">*</span></label>
                <input 
                  {...restoreForm.register('restoreReason')} 
                  className={`w-full bg-input border ${restoreForm.formState.errors.restoreReason ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2.5 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
                  placeholder="Enter reason..." 
                />
                {restoreForm.formState.errors.restoreReason && <p className="text-danger text-[11px] mt-1">{restoreForm.formState.errors.restoreReason.message}</p>}
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" className="px-4 py-2 bg-transparent border border-border text-text-primary text-[14px] font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors cursor-pointer" onClick={() => setRestoreDialog(null)}>Cancel</button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-success text-success-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  disabled={restorePending}
                >
                  {restorePending ? <RotateCcw size={14} className="animate-spin" /> : <RotateCcw size={14} />} 
                  {restorePending ? 'Restoring...' : 'Restore Access'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

