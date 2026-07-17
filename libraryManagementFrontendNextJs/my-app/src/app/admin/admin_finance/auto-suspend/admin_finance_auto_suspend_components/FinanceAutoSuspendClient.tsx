'use client';

import toast from 'react-hot-toast';
import { Settings, Ban, RotateCcw, Bell, Save, UserCheck, ShieldAlert, X } from 'lucide-react';
import { useFinanceAutoSuspend } from '@/app/admin/admin_finance/auto-suspend/admin_finance_auto_suspend_components/admin_finance_auto_suspend_hooks/useFinanceAutoSuspend';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function FinanceAutoSuspendClient() {
  const {
    config,
    suspended,
    configLoading,
    suspendedLoading,
    editing,
    setEditing,
    days,
    setDays,
    updatePending,
    restoreDialog,
    setRestoreDialog,
    restoreReason,
    setRestoreReason,
    restorePending,
    handleSave,
    handleRestore
  } = useFinanceAutoSuspend();

  const KPI_CARDS = [
    { label: 'Days Before Suspend', value: configLoading ? '—' : config?.daysBeforeSuspend, icon: Settings, variant: 'default' },
    { label: 'Currently Suspended', value: configLoading ? '—' : config?.currentlySuspended ?? 0, icon: Ban, variant: 'danger' },
    { label: 'Auto-Restored (Month)', value: configLoading ? '—' : config?.autoRestoredThisMonth ?? 0, icon: RotateCcw, variant: 'default' },
    { label: 'Manual Restores', value: configLoading ? '—' : config?.manualRestores ?? 0, icon: UserCheck, variant: 'default' },
  ] as const;

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-2xl font-bold tracking-tight">Auto-Suspend Policy</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage automatic suspension and student restoration.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {KPI_CARDS.map(({ label, value, icon: Icon, variant }) => (
          <Card key={label} className={`p-4 shadow-none flex flex-col justify-center ${variant === 'danger' ? 'border-danger/30 bg-danger/5' : 'border-border bg-card'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-bold tracking-wider uppercase ${variant === 'danger' ? 'text-danger' : 'text-muted-foreground'}`}>{label}</span>
              <Icon size={16} className={variant === 'danger' ? 'text-danger' : 'text-muted-foreground'} />
            </div>
            <p className={`text-2xl font-bold ${variant === 'danger' ? 'text-danger' : 'text-primary'}`}>{value}</p>
          </Card>
        ))}
      </div>

      {/* Policy Config */}
      <Card className="p-6 shadow-none border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <ShieldAlert size={18} className="text-muted-foreground" />
            Policy Configuration
          </div>
          {!editing && !configLoading && (
            <Button variant="outline" size="sm" onClick={() => { if (config) setDays(String(config.daysBeforeSuspend)); setEditing(true); }}>
              Edit
            </Button>
          )}
        </div>
        
        {configLoading ? (
          <div className="animate-pulse bg-muted h-10 w-full rounded max-w-md" />
        ) : editing ? (
          <div className="space-y-4 max-w-md bg-muted/20 p-4 rounded-lg border border-border">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary">Days before auto-suspend</label>
              <Input 
                type="number" 
                value={days} 
                onChange={(e) => setDays(e.target.value)} 
                placeholder="e.g. 5"
              />
              <p className="text-xs text-muted-foreground">Students overdue beyond this period are automatically suspended.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={updatePending} className="gap-2">
                <Save size={16} /> {updatePending ? 'Saving...' : 'Save Config'}
              </Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="bg-muted/30 p-4 rounded-lg border border-border">
            <p className="text-sm text-primary leading-relaxed">
              Students are automatically suspended after <strong className="font-bold text-danger text-lg">{config?.daysBeforeSuspend}</strong> days of non-payment past due date.
            </p>
          </div>
        )}
      </Card>

      {/* Suspended Students Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <Ban size={18} className="text-danger" />
          <h3 className="font-bold text-base text-primary">Suspended Students</h3>
        </div>
        
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b text-muted-foreground text-[11px] font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Seat</th>
                <th className="px-5 py-3">Shift</th>
                <th className="px-5 py-3">Last Payment</th>
                <th className="px-5 py-3">Days Overdue</th>
                <th className="px-5 py-3">Suspended Since</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {suspendedLoading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <p className="text-muted-foreground font-medium">Loading suspended students...</p>
                    </div>
                  </td>
                </tr>
              ) : suspended.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">🔓</div>
                      <p className="text-lg font-bold">No students currently suspended.</p>
                      <p className="text-sm text-muted-foreground">All students are in good standing.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                suspended.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-[13px] text-primary">{s.studentName}</div>
                      <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{s.smartId}</div>
                    </td>
                    <td className="px-5 py-4 text-[13px] font-medium text-primary">{s.seat}</td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-bold text-xs">
                        {s.shift}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-muted-foreground font-medium">—</td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-[13px] text-danger">{s.daysOverdue}d</span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-muted-foreground font-medium">{s.suspendedSince}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="bg-muted text-primary hover:bg-muted/80 border-none font-bold text-xs gap-1"
                          onClick={() => toast.success(`📱 WhatsApp reminder sent to ${s.studentName}.`)}
                        >
                          <Bell size={13} /> 📱 Send Reminder
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="bg-success/10 text-success hover:bg-success/20 border-none font-bold text-xs gap-1"
                          onClick={() => setRestoreDialog({ id: s.studentId, name: s.studentName })}
                        >
                          <RotateCcw size={13} /> ✅ Manual Restore
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Manual Restore Modal */}
      {restoreDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setRestoreDialog(null)}>
          <Card className="w-full max-w-sm shadow-lg border-success/20 bg-card p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-success tracking-tight">
                ✅ Restore Student
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setRestoreDialog(null)}>
                <X size={16} />
              </Button>
            </div>
            
            <div>
              <p className="text-sm font-bold text-primary">{restoreDialog.name}</p>
              <p className="text-sm text-muted-foreground mt-1">Manually restore seat access?</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Override reason <span className="text-danger">*</span></label>
              <Input 
                value={restoreReason}
                onChange={(e) => setRestoreReason(e.target.value)}
                placeholder="Enter reason for manual override..."
              />
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="ghost" onClick={() => setRestoreDialog(null)}>Cancel</Button>
              <Button 
                variant="default" 
                onClick={handleRestore}
                disabled={restorePending || !restoreReason.trim()}
                className="bg-success hover:bg-success/90 text-white"
              >
                {restorePending ? 'Restoring...' : 'Restore Access'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
