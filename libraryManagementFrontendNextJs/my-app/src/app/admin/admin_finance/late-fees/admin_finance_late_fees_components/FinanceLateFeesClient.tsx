'use client';

import { useRouter } from 'next/navigation';
import { Settings, AlertTriangle, Save, MessageSquare } from 'lucide-react';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { useFinanceLateFees } from './admin_finance_late_fees_hooks/useFinanceLateFees';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function FinanceLateFeesClient() {
  const router = useRouter();
  const {
    config,
    overdue,
    isLoading,
    editing,
    setEditing,
    graceDays,
    setGraceDays,
    penaltyRate,
    setPenaltyRate,
    isSaving,
    startEdit,
    handleSave,
    sendWhatsAppReminder
  } = useFinanceLateFees();

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-2xl font-bold tracking-tight">Late Fees</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure late fee policies and view overdue students.</p>
        </div>
      </div>

      {/* Config Card */}
      <Card className="p-6 shadow-none border-border bg-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-bold text-primary">
            <Settings size={18} className="text-muted-foreground" />
            Late Fee Settings
          </div>
          {!editing && !isLoading && (
            <Button variant="outline" size="sm" onClick={startEdit}>Edit Settings</Button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-pulse bg-muted h-10 w-full rounded" />
            <div className="animate-pulse bg-muted h-10 w-full rounded" />
          </div>
        ) : editing ? (
          <div className="space-y-5 max-w-md">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary">Grace Period (days)</label>
              <Input 
                type="number" 
                value={graceDays} 
                onChange={(e) => setGraceDays(e.target.value)} 
                placeholder="e.g. 3"
              />
              <p className="text-xs text-muted-foreground">Days after due date before penalties apply</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary">Penalty Per Day (₹)</label>
              <Input 
                type="number" 
                value={penaltyRate} 
                onChange={(e) => setPenaltyRate(e.target.value)} 
                placeholder="e.g. 50"
              />
              <p className="text-xs text-muted-foreground">Daily late fee amount after grace period</p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={isSaving || !graceDays || !penaltyRate} className="gap-2">
                <Save size={16} /> {isSaving ? 'Saving...' : 'Save Rules'}
              </Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Grace Period</p>
              <p className="text-2xl font-bold text-primary">{config?.gracePeriodDays} days</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Penalty Per Day</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(config?.penaltyPerDay || 0)}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Overdue Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <AlertTriangle size={18} className="text-warning" />
          <h3 className="font-bold text-base text-primary">Overdue Students</h3>
        </div>
        
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b text-muted-foreground text-[11px] font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3 text-right">Days Overdue</th>
                <th className="px-5 py-3 text-right">Late Fee Accrued</th>
                <th className="px-5 py-3 text-right">Total Due</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <p className="text-muted-foreground font-medium">Loading overdue records...</p>
                    </div>
                  </td>
                </tr>
              ) : overdue.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">✅</div>
                      <p className="text-lg font-bold">No active late fee charges.</p>
                      <p className="text-sm text-muted-foreground">All students are up to date on their payments.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                overdue.map((s) => (
                  <tr key={s.studentId} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-[13px] text-primary">{s.studentName}</div>
                      <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{s.smartId}</div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-muted-foreground font-medium">
                      {s.dueDate}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-bold text-[13px] text-danger">{s.daysOverdue}d</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-bold text-[13px] text-warning">{formatCurrency(s.accruedFee)}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-bold text-[13px] text-danger">{formatCurrency(s.totalDue)}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="bg-info/10 text-info hover:bg-info/20 border-none font-bold text-xs"
                          onClick={() => router.push(`/admin/admin_finance/collect-fee?studentId=${s.studentId}`)}
                        >
                          💰 Collect Now
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="bg-success/10 text-success hover:bg-success/20 border-none font-bold text-xs gap-1"
                          onClick={() => sendWhatsAppReminder(s)}
                          title="Send WhatsApp Reminder"
                        >
                          <MessageSquare size={14} /> WA
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
    </div>
  );
}
