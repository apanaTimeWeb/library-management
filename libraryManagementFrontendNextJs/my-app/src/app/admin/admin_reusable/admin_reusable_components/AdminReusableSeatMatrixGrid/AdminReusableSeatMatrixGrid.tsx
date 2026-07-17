// RESPONSIBILITY: Renders the seat occupancy grid matrix with shift/fee filters and assignment navigation.
// DATA FLOW: AdminDashboardPage / Seat Management -> AdminReusableSeatMatrixGrid -> AdminReusableSeatCell

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminReusableSeatCell from '@/app/admin/admin_reusable/admin_reusable_components/AdminReusableSeatCell/AdminReusableSeatCell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

export interface AdminReusableSeatData {
  id: string;
  shift: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  fee: 'Paid' | 'Due';
  occupant?: string;
  expiry?: string;
  studentId?: string;
}

interface Props {
  seats: AdminReusableSeatData[];
  shifts: string[];
}

const LEGEND = [
  { label: 'Free',          cls: 'bg-success/10 text-success hover:bg-success/20' },
  { label: 'Occupied',      cls: 'bg-info/10 text-info hover:bg-info/20' },
  { label: 'Expiring ≤7d',  cls: 'bg-warning/10 text-warning hover:bg-warning/20' },
  { label: 'Maintenance',   cls: 'bg-muted text-muted-foreground hover:bg-muted/80' },
];

export default function AdminReusableSeatMatrixGrid({ seats, shifts }: Props) {
  const router = useRouter();
  const [activeShift, setActiveShift]   = useState('All');
  const [feeFilter, setFeeFilter]       = useState('All');
  const [appliedFee, setAppliedFee]     = useState('All');
  const [appliedShift, setAppliedShift] = useState('All');

  const allTabs = ['All', ...shifts];

  const filtered = seats.filter(s => {
    const tabMatch   = activeShift  === 'All' || s.shift === activeShift;
    const feeMatch   = appliedFee   === 'All' || s.fee   === appliedFee;
    const shiftMatch = appliedShift === 'All' || s.shift === appliedShift;
    return tabMatch && feeMatch && shiftMatch;
  });

  const counts = {
    free:        filtered.filter(s => s.status === 'free').length,
    occupied:    filtered.filter(s => s.status === 'occupied').length,
    expiring:    filtered.filter(s => s.status === 'expiring').length,
    maintenance: filtered.filter(s => s.status === 'maintenance').length,
  };

  function handleCellClick(seat: AdminReusableSeatData) {
    if (seat.status === 'occupied' || seat.status === 'expiring') {
      router.push(seat.studentId ? `${ADMIN_ROUTES.STUDENTS}/${seat.studentId}` : ADMIN_ROUTES.STUDENTS);
    } else if (seat.status === 'free') {
      router.push(`${ADMIN_ROUTES.STUDENTS}/new`);
    }
  }

  function handleApply() {
    setAppliedFee(feeFilter);
  }

  function handleClear() {
    setAppliedFee('All');
    setAppliedShift('All');
    setFeeFilter('All');
    setActiveShift('All');
  }

  return (
    <Card className="flex flex-col overflow-hidden h-full border-border bg-card shadow-none">
      
      {/* Header + shift tabs */}
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">Seat Matrix</CardTitle>
            <CardDescription className="text-xs mt-1">
              {counts.occupied + counts.expiring} occupied · {counts.free} free
              · {counts.expiring} expiring · {counts.maintenance} maintenance
            </CardDescription>
          </div>

          {/* Shift tabs */}
          <div className="flex bg-muted/50 p-1 rounded-md overflow-x-auto max-w-full no-scrollbar">
            {allTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveShift(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap transition-colors ${
                  activeShift === tab 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      {/* Seat grid */}
      <CardContent className="flex-1 p-4 overflow-y-auto bg-muted/10 min-h-[300px]">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <p className="text-muted-foreground text-sm font-medium">
              No seats match the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))' }}>
            {filtered.map(seat => (
              <AdminReusableSeatCell
                key={seat.id}
                id={seat.id}
                status={seat.status}
                occupant={seat.occupant}
                shift={seat.shift}
                expiry={seat.expiry}
                onClick={() => handleCellClick(seat)}
              />
            ))}
          </div>
        )}
      </CardContent>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-muted/30 border-t">
        <span className="text-xs font-semibold text-muted-foreground mr-1">Legend:</span>
        {LEGEND.map(l => (
          <Badge key={l.label} variant="secondary" className={`${l.cls} border-none`}>
            {l.label}
          </Badge>
        ))}
      </div>

      {/* Advanced filter bar */}
      <CardFooter className="flex flex-wrap items-center gap-3 py-3 px-4 bg-muted/10 border-t">
        <span className="text-xs font-semibold text-muted-foreground">Filter:</span>

        <Select value={appliedShift} onValueChange={setAppliedShift}>
          <SelectTrigger className="w-[140px] h-8 text-xs">
            <SelectValue placeholder="All Shifts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Shifts</SelectItem>
            {shifts.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={feeFilter} onValueChange={setFeeFilter}>
          <SelectTrigger className="w-[140px] h-8 text-xs">
            <SelectValue placeholder="All Fee Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Fee Status</SelectItem>
            <SelectItem value="Due">Due</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleApply} size="sm" variant="default" className="h-8 text-xs">
          Apply Filter
        </Button>

        {(appliedFee !== 'All' || appliedShift !== 'All') && (
          <Button onClick={handleClear} size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground">
            Clear
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

