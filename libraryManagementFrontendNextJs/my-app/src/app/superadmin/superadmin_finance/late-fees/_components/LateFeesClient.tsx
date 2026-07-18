// RESPONSIBILITY: Renders the LateFeesClient component.
'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Settings, AlertTriangle, Save, MessageSquare } from 'lucide-react';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { useLateFeesClient } from '@/app/superadmin/superadmin_finance/late-fees/_components/useLateFeesClient';

export function LateFeesClient() {
  const {
    config, overdue, isLoading, editing, isSaving, form,
    startEdit, cancelEdit, onSubmit, sendWhatsAppReminder, navigateToCollect
  } = useLateFeesClient();

  return (
    <div className="space-y-6">
      <Toaster position="bottom-right" toastOptions={{
        className: 'bg-card text-text-primary border border-border text-[13px]'
      }} />

      <div>
        <h1 className="text-[22px] font-bold text-text-primary">Late Fees</h1>
        <p className="text-[12px] text-text-secondary">Configure late fee policies and view overdue students.</p>
      </div>

      {/* Config Card */}
      <div className="bg-card rounded-[var(--radius-lg)] border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[14px] text-text-primary font-bold">
            <Settings size={18} className="text-text-secondary" />
            Late Fee Settings
          </div>
          {!editing && (
            <button className="px-3 py-1.5 bg-input border border-border text-text-primary text-[12px] font-bold rounded-[var(--radius-md)] hover:bg-border transition-colors cursor-pointer" onClick={startEdit}>
              Edit
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <div className="h-10 w-full bg-skeleton-base rounded animate-pulse" />
            <div className="h-10 w-full bg-skeleton-base rounded animate-pulse" />
          </div>
        ) : editing ? (
          <form onSubmit={onSubmit} className="space-y-4 max-w-sm">
            <div>
              <label className="text-[12px] font-bold text-text-secondary block mb-1">Grace Period (days) <span className="text-danger">*</span></label>
              <input 
                type="number" 
                {...form.register('gracePeriodDays', { valueAsNumber: true })}
                className={`w-full bg-input border ${form.formState.errors.gracePeriodDays ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
              />
              {form.formState.errors.gracePeriodDays && <p className="text-danger text-[11px] mt-1">{form.formState.errors.gracePeriodDays.message}</p>}
              <p className="text-[11px] text-text-secondary mt-1">Days after due date before penalties apply</p>
            </div>
            <div>
              <label className="text-[12px] font-bold text-text-secondary block mb-1">Penalty Per Day (₹) <span className="text-danger">*</span></label>
              <input 
                type="number" 
                {...form.register('penaltyPerDay', { valueAsNumber: true })}
                className={`w-full bg-input border ${form.formState.errors.penaltyPerDay ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
              />
              {form.formState.errors.penaltyPerDay && <p className="text-danger text-[11px] mt-1">{form.formState.errors.penaltyPerDay.message}</p>}
              <p className="text-[11px] text-text-secondary mt-1">Daily late fee amount after grace period</p>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex items-center gap-1 bg-success text-success-foreground px-4 py-2 rounded-[var(--radius-md)] text-[12px] font-bold hover:brightness-95 transition-all cursor-pointer disabled:opacity-50" disabled={isSaving}>
                <Save size={14} /> {isSaving ? 'Saving...' : 'Save Rules'}
              </button>
              <button type="button" className="bg-transparent border border-border text-text-primary px-4 py-2 rounded-[var(--radius-md)] text-[12px] font-bold hover:bg-input transition-colors cursor-pointer" onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-6 p-4 bg-primary/5 rounded-[var(--radius-md)] border border-primary/10">
            <div>
              <p className="text-[12px] text-text-secondary mb-1 uppercase tracking-wider font-bold">Grace Period</p>
              <p className="text-[20px] font-black text-text-primary tracking-tight">{config?.gracePeriodDays} <span className="text-[14px] text-text-secondary font-medium tracking-normal">days</span></p>
            </div>
            <div>
              <p className="text-[12px] text-text-secondary mb-1 uppercase tracking-wider font-bold">Penalty Per Day</p>
              <p className="text-[20px] font-black text-text-primary tracking-tight">{formatCurrency(config?.penaltyPerDay || 0)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Overdue Table */}
      <div className="bg-card rounded-[var(--radius-lg)] border border-border overflow-x-auto">
        <div className="flex items-center gap-2 p-4 border-b border-border bg-page/50">
          <AlertTriangle size={18} className="text-warning" />
          <span className="text-[14px] text-text-primary font-bold">Overdue Students</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 uppercase text-[12px] font-semibold text-text-secondary border-b border-border">
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Subscription Due Date</th>
              <th className="py-3 px-4">Days Overdue</th>
              <th className="text-right py-3 px-4">Late Fee Accrued ₹</th>
              <th className="text-right py-3 px-4">Total Due ₹</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 w-16 bg-skeleton-base rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : overdue.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <div className="text-4xl">🎉</div>
                    <p className="text-[16px] text-text-secondary">No active late fee charges.</p>
                  </div>
                </td>
              </tr>
            ) : (
              overdue.map((s) => (
                <tr key={s.studentId} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-text-primary text-[14px]">{s.studentName}</div>
                    <div className="text-[12px] text-text-secondary">{s.smartId}</div>
                  </td>
                  <td className="py-3 px-4 text-[12px] text-text-secondary">{s.dueDate}</td>
                  <td className="py-3 px-4">
                    <span className="text-danger font-bold text-[14px]">{s.daysOverdue}d</span>
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] font-semibold text-warning">{formatCurrency(s.accruedFee)}</td>
                  <td className="py-3 px-4 text-right text-[14px] font-bold text-danger">{formatCurrency(s.totalDue)}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-[var(--radius-md)] text-[12px] font-bold hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        onClick={() => navigateToCollect(s.studentId)}
                      >
                        💰 Collect Now
                      </button>
                      <button
                        className="bg-success text-success-foreground px-2.5 py-1 rounded-[var(--radius-md)] text-[12px] font-bold flex items-center gap-1 hover:brightness-95 transition-colors cursor-pointer"
                        onClick={() => sendWhatsAppReminder(s)}
                        title="Send WhatsApp Reminder"
                      >
                        <MessageSquare size={12} /> WA
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

