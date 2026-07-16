'use client';

// RESPONSIBILITY: Client view rendering shift gap analysis (`Rule 1`, `Rule 36`, `Rule 57`).
// DATA FLOW: Static Mock -> AdminAccountingShiftGapAnalyzerClient (`Rule 39`).

import { useState } from 'react';

type ShiftGap = {
  shift: string;
  totalSeats: number;
  occupied: number;
  vacant: number;
  occupancyPct: number;
  avgGapDays: number;
  revenueLoss: number;
};

const MOCK: ShiftGap[] = [
  { shift: 'Morning (6AM–2PM)',   totalSeats: 40, occupied: 34, vacant: 6,  occupancyPct: 85, avgGapDays: 12, revenueLoss: 3600  },
  { shift: 'Afternoon (2PM–9PM)', totalSeats: 40, occupied: 28, vacant: 12, occupancyPct: 70, avgGapDays: 18, revenueLoss: 7200  },
  { shift: 'Night (9PM–6AM)',     totalSeats: 30, occupied: 18, vacant: 12, occupancyPct: 60, avgGapDays: 24, revenueLoss: 8640  },
  { shift: '24-Hour',             totalSeats: 20, occupied: 19, vacant: 1,  occupancyPct: 95, avgGapDays: 5,  revenueLoss: 600   },
];

type DayGap = { date: string; shift: string; seatNo: string; gapDays: number; loss: number };

const DAY_GAPS: DayGap[] = [
  { date: '2026-04-10', shift: 'Afternoon', seatNo: 'B-11', gapDays: 22, loss: 1100 },
  { date: '2026-04-09', shift: 'Night',     seatNo: 'C-07', gapDays: 18, loss: 900  },
  { date: '2026-04-08', shift: 'Morning',   seatNo: 'A-04', gapDays: 14, loss: 700  },
  { date: '2026-04-07', shift: 'Night',     seatNo: 'C-12', gapDays: 30, loss: 1500 },
  { date: '2026-04-06', shift: 'Afternoon', seatNo: 'B-03', gapDays: 9,  loss: 450  },
];

export function AdminAccountingShiftGapAnalyzerClient() {
  const [shiftFilter, setShiftFilter] = useState('all');

  const visibleDays = shiftFilter === 'all' ? DAY_GAPS : DAY_GAPS.filter(d => d.shift === shiftFilter);
  const totalLoss = MOCK.reduce((s, m) => s + m.revenueLoss, 0);

  return (
    <div className="space-y-6 pb-10">
      <div className="admin-page-header border-b border-border pb-4 flex items-center justify-between">
        <div>
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Accounting › Shift Gap Analyzer</p>
          <h1 className="admin-page-title text-2xl font-extrabold tracking-tight">Shift Gap Analyzer</h1>
          <p className="admin-page-subtitle text-muted-foreground mt-1">Analyze occupancy gaps and revenue loss per shift.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-danger/20 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-danger mb-1">Total Revenue Loss</p>
          <p className="text-2xl font-extrabold text-danger">₹{totalLoss.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-warning/20 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-warning mb-1">Total Vacant Seats</p>
          <p className="text-2xl font-extrabold text-warning">{MOCK.reduce((s,m)=>s+m.vacant,0)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Avg Occupancy</p>
          <p className="text-2xl font-extrabold text-foreground">{Math.round(MOCK.reduce((s,m)=>s+m.occupancyPct,0)/MOCK.length)}%</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Shifts Analyzed</p>
          <p className="text-2xl font-extrabold text-foreground">{MOCK.length}</p>
        </div>
      </div>

      {/* Shift Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK.map(m => (
          <div key={m.shift} className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <p className="font-bold text-foreground text-lg">{m.shift}</p>
              <span className={`admin-badge ${m.occupancyPct >= 90 ? 'admin-badge-success' : m.occupancyPct >= 70 ? 'admin-badge-warning' : 'admin-badge-danger'}`}>
                {m.occupancyPct}% full
              </span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${m.occupancyPct >= 90 ? 'bg-success' : m.occupancyPct >= 70 ? 'bg-warning' : 'bg-danger'}`} 
                style={{ width: `${m.occupancyPct}%` }} 
              />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center border-t border-border pt-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Occupied</p>
                <p className="text-success font-bold text-lg mt-1">{m.occupied}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vacant</p>
                <p className="text-danger font-bold text-lg mt-1">{m.vacant}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Loss</p>
                <p className="text-warning font-bold text-lg mt-1">₹{m.revenueLoss.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Day-wise Gap Table */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-sm font-bold uppercase tracking-wider text-foreground">Day-wise Gap Log</p>
        <select className="admin-input max-w-[160px]" value={shiftFilter} onChange={e => setShiftFilter(e.target.value)}>
          <option value="all">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Shift</th>
              <th className="py-3 px-4">Seat No</th>
              <th className="text-right py-3 px-4">Gap Days</th>
              <th className="text-right py-3 px-4">Revenue Loss (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleDays.map((d) => (
              <tr key={`daygap-${d.date}-${d.seatNo}-${d.shift}`} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 text-muted-foreground font-medium">{d.date}</td>
                <td className="py-3 px-4 text-foreground">{d.shift}</td>
                <td className="py-3 px-4 font-bold text-foreground">{d.seatNo}</td>
                <td className={`py-3 px-4 text-right font-semibold ${d.gapDays > 20 ? 'text-danger' : 'text-warning'}`}>{d.gapDays}d</td>
                <td className="py-3 px-4 text-right text-danger font-semibold">₹{d.loss.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
