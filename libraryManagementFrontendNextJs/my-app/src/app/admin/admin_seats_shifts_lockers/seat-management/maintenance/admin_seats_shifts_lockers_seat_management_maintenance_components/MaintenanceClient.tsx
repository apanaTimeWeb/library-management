'use client';

import { ChevronDown, AlertTriangle, Plus } from 'lucide-react';
import { useMaintenance, type SeatStatus } from '@/app/admin/admin_seats_shifts_lockers/seat-management/maintenance/admin_seats_shifts_lockers_seat_management_maintenance_hooks/useMaintenance';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const STATUS_CLASS: Record<SeatStatus, string> = {
  Working: 'bg-success/10 text-success hover:bg-success/20',
  Maintenance: 'bg-warning/10 text-warning hover:bg-warning/20',
  Broken: 'bg-danger/10 text-danger hover:bg-danger/20',
};

export function MaintenanceClient() {
  const {
    selectedSeat,
    setSelectedSeat,
    form,
    setForm,
    errors,
    currentLogs,
    daysSince,
    showOverdue,
    currentStatus,
    handleAddEntry,
    SEATS
  } = useMaintenance();

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Seat Maintenance Log</h1>
          <p className="text-sm text-muted-foreground mt-1">Track all seat repair and maintenance activity</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-muted/30 p-3 rounded-xl border border-border">
        <div className="relative">
          <select 
            className="flex h-10 w-40 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            value={selectedSeat} 
            onChange={e => setSelectedSeat(e.target.value)}
          >
            {SEATS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        <Badge variant="secondary" className={`${STATUS_CLASS[currentStatus]} border-none font-bold px-3 py-1`}>
          {currentStatus}
        </Badge>
      </div>

      {showOverdue && (
        <div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/20 rounded-xl text-warning">
          <AlertTriangle size={18} />
          <span className="text-sm">Last maintenance was <strong>{daysSince} days ago</strong> — attention recommended.</span>
        </div>
      )}

      {currentLogs.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 px-4 text-center shadow-none border-border">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-xl">🔧</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">No maintenance history for this seat.</h3>
          <p className="text-sm text-muted-foreground mt-2">All maintenance entries will appear here.</p>
        </Card>
      ) : (
        <Card className="flex-1 shadow-none border-border overflow-hidden flex flex-col">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 border-y text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Remark</th>
                  <th className="px-4 py-3">Done By</th>
                  <th className="px-4 py-3">Status Before</th>
                  <th className="px-4 py-3">Status After</th>
                  <th className="px-4 py-3 text-right">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-4 text-muted-foreground font-medium">{log.num}</td>
                    <td className="px-4 py-4 text-muted-foreground">{log.date}</td>
                    <td className="px-4 py-4 font-medium text-foreground">{log.remark}</td>
                    <td className="px-4 py-4 text-muted-foreground">{log.doneBy}</td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className={`${STATUS_CLASS[log.statusBefore]} border-none font-semibold`}>
                        {log.statusBefore}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className={`${STATUS_CLASS[log.statusAfter]} border-none font-semibold`}>
                        {log.statusAfter}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-right text-muted-foreground font-medium">{log.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card className="p-6 shadow-none border-border">
        <h3 className="text-lg font-semibold mb-6">Add New Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date <span className="text-danger">*</span></label>
            <Input type="date" className={`${errors.date ? 'border-danger' : ''}`} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
            {errors.date && <p className="text-xs text-danger">{errors.date}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Done By</label>
            <Input placeholder="Technician name" value={form.doneBy} onChange={e => setForm(p => ({ ...p, doneBy: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Seat Status <span className="text-danger">*</span></label>
            <div className="relative">
              <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none" value={form.newStatus} onChange={e => setForm(p => ({ ...p, newStatus: e.target.value as SeatStatus }))}>
                <option value="Working">Working</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Broken">Broken</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cost (₹)</label>
            <Input type="number" placeholder="e.g. 350" value={form.cost} onChange={e => setForm(p => ({ ...p, cost: e.target.value }))} />
          </div>
        </div>
        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium">Remark <span className="text-danger">*</span></label>
          <textarea className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.remark ? 'border-danger focus-visible:ring-danger' : ''}`} rows={2} placeholder="e.g. Chair leg repaired" value={form.remark} onChange={e => setForm(p => ({ ...p, remark: e.target.value }))} />
          {errors.remark && <p className="text-xs text-danger">{errors.remark}</p>}
        </div>
        <div className="flex justify-end pt-4 border-t border-border">
          <Button onClick={handleAddEntry} className="gap-2">
            <Plus size={16} /> Add Log Entry
          </Button>
        </div>
      </Card>
    </div>
  );
}
