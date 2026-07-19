import { useUrlState } from '@/app/admin/admin_shared_hooks/useUrlState';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

'use client';
// RESPONSIBILITY: Client view rendering shift gap analysis (`Rule 1`, `Rule 36`, `Rule 57`).
// DATA FLOW: Static Mock -> AdminAccountingShiftGapAnalyzerClient (`Rule 39`).

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TablePagination } from '@/components/ui/table-pagination';
import { ShiftGap, DayGap } from "./AdminAccountingShiftGapAnalyzerClient_types";
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

const MOCK: ShiftGap[] = [
  { shift: 'Morning (6AMâ€“2PM)',   totalSeats: 40, occupied: 34, vacant: 6,  occupancyPct: 85, avgGapDays: 12, revenueLoss: 3600  },
  { shift: 'Afternoon (2PMâ€“9PM)', totalSeats: 40, occupied: 28, vacant: 12, occupancyPct: 70, avgGapDays: 18, revenueLoss: 7200  },
  { shift: 'Night (9PMâ€“6AM)',     totalSeats: 30, occupied: 18, vacant: 12, occupancyPct: 60, avgGapDays: 24, revenueLoss: 8640  },
  { shift: '24-Hour',             totalSeats: 20, occupied: 19, vacant: 1,  occupancyPct: 95, avgGapDays: 5,  revenueLoss: 600   },
];
const DAY_GAPS: DayGap[] = [
  { date: '2026-04-10', shift: 'Afternoon', seatNo: 'B-11', gapDays: 22, loss: 1100 },
  { date: '2026-04-09', shift: 'Night',     seatNo: 'C-07', gapDays: 18, loss: 900  },
  { date: '2026-04-08', shift: 'Morning',   seatNo: 'A-04', gapDays: 14, loss: 700  },
  { date: '2026-04-07', shift: 'Night',     seatNo: 'C-12', gapDays: 30, loss: 1500 },
  { date: '2026-04-06', shift: 'Afternoon', seatNo: 'B-03', gapDays: 9,  loss: 450  },
];

export function AdminAccountingShiftGapAnalyzerClient() {

    const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [shiftFilter, setShiftFilter] = useUrlState('shiftFilter', 'all' as string);

  const visibleDays = shiftFilter === 'all' ? DAY_GAPS : DAY_GAPS.filter(d => d.shift === shiftFilter);
  const totalLoss = MOCK.reduce((s, m) => s + m.revenueLoss, 0);
    const table = useClientTable(visibleDays, 10);
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Shift Gap Analyzer</h1>
          <p className="text-sm text-muted-foreground mt-1">Analyze occupancy gaps and revenue loss per shift.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 shadow-sm border-danger/20">
          <p className="text-xs font-bold uppercase tracking-wider text-danger mb-1">Total Revenue Loss</p>
          <p className="text-text-primary text-xl font-extrabold text-danger">â‚¹{totalLoss.toLocaleString()}</p>
        </Card>
        <Card className="p-5 shadow-sm border-warning/20">
          <p className="text-xs font-bold uppercase tracking-wider text-warning mb-1">Total Vacant Seats</p>
          <p className="text-text-primary text-xl font-extrabold text-warning">{MOCK.reduce((s,m)=>s+m.vacant,0)}</p>
        </Card>
        <Card className="p-5 shadow-sm border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Avg Occupancy</p>
          <p className="text-text-primary text-xl font-extrabold text-foreground">{Math.round(MOCK.reduce((s,m)=>s+m.occupancyPct,0)/MOCK.length)}%</p>
        </Card>
        <Card className="p-5 shadow-sm border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Shifts Analyzed</p>
          <p className="text-text-primary text-xl font-extrabold text-foreground">{MOCK.length}</p>
        </Card>
      </div>

      {/* Shift Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK.map(m => (
          <Card key={m.shift} className="p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow border-border">
            <div className="flex items-center justify-between">
              <p className="font-bold text-foreground text-lg">{m.shift}</p>
              <Badge variant="secondary" className={`${m.occupancyPct >= 90 ? 'bg-success/10 text-success hover:bg-success/20' : m.occupancyPct >= 70 ? 'bg-warning/10 text-warning hover:bg-warning/20' : 'bg-danger/10 text-danger hover:bg-danger/20'} border-none font-bold tracking-wide`}>
                {m.occupancyPct}% full
              </Badge>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${m.occupancyPct >= 90 ? 'bg-success' : m.occupancyPct >= 70 ? 'bg-warning' : 'bg-danger'} w-[length:var(--w)]`} style={{ '--w': `${m.occupancyPct}%` } as React.CSSProperties} 
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
                <p className="text-warning font-bold text-lg mt-1">â‚¹{m.revenueLoss.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Day-wise Gap Table */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-sm font-bold uppercase tracking-wider text-foreground">Day-wise Gap Log</p>
        <AdminSearchableDropdown className="flex h-10 w-40 items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={shiftFilter} onChange={e => setShiftFilter(e.target.value)}>
          <option value="all">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </AdminSearchableDropdown>
      </div>

      <Card className="overflow-x-auto shadow-sm border-border">
        
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

<div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Shift</th>
              <th className="py-3 px-4">Seat No</th>
              <th className="text-right py-3 px-4">Gap Days</th>
              <th className="text-right py-3 px-4">Revenue Loss (â‚¹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleDays.filter(row => JSON.stringify(row).toLowerCase().includes(searchTerm.toLowerCase())).slice((page - 1) * limit, page * limit).map((d) => (
              <tr key={`daygap-${d.date}-${d.seatNo}-${d.shift}`} className="hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4 text-muted-foreground font-medium">{d.date}</td>
                <td className="py-4 px-4 text-foreground">{d.shift}</td>
                <td className="py-4 px-4 font-bold text-foreground">{d.seatNo}</td>
                <td className={`py-4 px-4 text-right font-semibold ${d.gapDays > 20 ? 'text-danger' : 'text-warning'}`}>{d.gapDays}d</td>
                <td className="py-4 px-4 text-right text-danger font-semibold">â‚¹{d.loss.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />

      <TablePagination 
        totalItems={100} 
        page={page} 
        limit={limit} 
        onPageChange={setPage} 
        onLimitChange={setLimit} 
      />
    
      </Card>
    </div>
  );
}

