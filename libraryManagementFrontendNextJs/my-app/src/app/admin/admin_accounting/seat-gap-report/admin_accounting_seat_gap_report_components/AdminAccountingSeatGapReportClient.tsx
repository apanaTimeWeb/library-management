'use client';

// RESPONSIBILITY: Client view rendering seat gap report (`Rule 1`, `Rule 36`).
// DATA FLOW: Static Mock -> AdminAccountingSeatGapReportClient (`Rule 39`).

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type GapRow = {
  seatNo: string;
  shift: string;
  floor: string;
  lastOccupied: string;
  gapDays: number;
  revenueLoss: number;
  status: 'vacant' | 'maintenance';
};

const MOCK: GapRow[] = [
  { seatNo: 'A-04', shift: 'Morning',   floor: 'Ground', lastOccupied: '2026-03-28', gapDays: 14, revenueLoss: 700,  status: 'vacant'      },
  { seatNo: 'B-11', shift: 'Afternoon', floor: 'First',  lastOccupied: '2026-03-20', gapDays: 22, revenueLoss: 1100, status: 'vacant'      },
  { seatNo: 'C-07', shift: 'Night',     floor: 'Ground', lastOccupied: '2026-04-01', gapDays: 10, revenueLoss: 500,  status: 'maintenance' },
  { seatNo: 'A-09', shift: 'Morning',   floor: 'First',  lastOccupied: '2026-03-15', gapDays: 27, revenueLoss: 1350, status: 'vacant'      },
  { seatNo: 'D-02', shift: 'Afternoon', floor: 'Second', lastOccupied: '2026-04-05', gapDays: 6,  revenueLoss: 300,  status: 'vacant'      },
  { seatNo: 'B-15', shift: 'Morning',   floor: 'Ground', lastOccupied: '2026-03-10', gapDays: 32, revenueLoss: 1600, status: 'vacant'      },
];

export function AdminAccountingSeatGapReportClient() {
  const [shiftFilter, setShiftFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const visible = MOCK.filter(r =>
    (shiftFilter === 'all' || r.shift === shiftFilter) &&
    (statusFilter === 'all' || r.status === statusFilter)
  );

  const totalLoss = visible.reduce((s, r) => s + r.revenueLoss, 0);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Seat Gap Report</h1>
          <p className="text-sm text-muted-foreground mt-1">Identify vacant seats and estimated revenue loss.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 shadow-sm border-danger/20">
          <p className="text-xs font-bold uppercase tracking-wider text-danger mb-1">Total Gap Seats</p>
          <p className="text-2xl font-extrabold text-danger">{MOCK.length}</p>
        </Card>
        <Card className="p-5 shadow-sm border-warning/20">
          <p className="text-xs font-bold uppercase tracking-wider text-warning mb-1">Revenue Loss</p>
          <p className="text-2xl font-extrabold text-warning">₹{totalLoss.toLocaleString()}</p>
        </Card>
        <Card className="p-5 shadow-sm border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Avg Gap Days</p>
          <p className="text-2xl font-extrabold text-foreground">{Math.round(MOCK.reduce((s,r)=>s+r.gapDays,0)/MOCK.length)}</p>
        </Card>
        <Card className="p-5 shadow-sm border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Under Maintenance</p>
          <p className="text-2xl font-extrabold text-foreground">{MOCK.filter(r=>r.status==='maintenance').length}</p>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <select className="flex h-10 w-40 items-center justify-between rounded-md border border-border bg-bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={shiftFilter} onChange={e => setShiftFilter(e.target.value)}>
          <option value="all">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>
        <select className="flex h-10 w-40 items-center justify-between rounded-md border border-border bg-bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="vacant">Vacant</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <Button variant="outline" className="ml-auto gap-2">
          <Download size={16} /> Export
        </Button>
      </div>

      <Card className="overflow-x-auto shadow-sm border-border">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Seat No</th>
              <th className="py-3 px-4">Shift</th>
              <th className="py-3 px-4">Floor</th>
              <th className="py-3 px-4">Last Occupied</th>
              <th className="text-right py-3 px-4">Gap Days</th>
              <th className="text-right py-3 px-4">Revenue Loss (₹)</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visible.length === 0 ? (
              <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">No gap seats found.</td></tr>
            ) : visible.map(r => (
              <tr key={`${r.seatNo}-${r.shift}`} className="hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4 font-bold text-foreground">{r.seatNo}</td>
                <td className="py-4 px-4 text-muted-foreground">{r.shift}</td>
                <td className="py-4 px-4 text-muted-foreground">{r.floor}</td>
                <td className="py-4 px-4 text-muted-foreground">{r.lastOccupied}</td>
                <td className={`py-4 px-4 text-right font-semibold ${r.gapDays > 20 ? 'text-danger' : 'text-warning'}`}>{r.gapDays}d</td>
                <td className="py-4 px-4 text-right font-semibold text-danger">₹{r.revenueLoss.toLocaleString()}</td>
                <td className="py-4 px-4">
                  <Badge variant="secondary" className={`${r.status === 'vacant' ? 'bg-warning/10 text-warning hover:bg-warning/20' : 'bg-muted text-muted-foreground'} border-none font-bold tracking-wide`}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
