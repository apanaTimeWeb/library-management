'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminDashboardSeatCell } from '@/app/admin/admin_dashboard/admin_dashboard_components/AdminDashboardSeatCell';

export interface AdminDashboardSeatData {
  id: string;
  shift: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  fee: 'Paid' | 'Due';
  occupant?: string;
  expiry?: string;
  studentId?: string;
}

interface Props {
  seats: AdminDashboardSeatData[];
  shifts: string[];
  state: {
    activeShift: string;
    setActiveShift: (val: string) => void;
    feeFilter: string;
    setFeeFilter: (val: string) => void;
    appliedFee: string;
    appliedShift: string;
    setAppliedShift: (val: string) => void;
    handleSeatClick: (seat: AdminDashboardSeatData) => void;
    handleApplyFilters: () => void;
    handleClearFilters: () => void;
  };
}

const LEGEND = [
  { label: 'Free',          cls: 'bg-success/10 text-success' },
  { label: 'Occupied',      cls: 'bg-info/10 text-info' },
  { label: 'Expiring ≤7d',  cls: 'bg-warning/10 text-warning' },
  { label: 'Maintenance',   cls: 'bg-muted text-muted-foreground' },
];

export function AdminDashboardSeatMatrixGrid({ seats, shifts, state }: Props) {
  const {
    activeShift, setActiveShift,
    feeFilter, setFeeFilter,
    appliedFee,
    appliedShift, setAppliedShift,
    handleSeatClick,
    handleApplyFilters,
    handleClearFilters
  } = state;

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

  return (
    <Card className="flex flex-col overflow-hidden h-full border-border bg-card shadow-none">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">Seat Matrix</CardTitle>
            <CardDescription className="text-xs mt-1">
              {counts.occupied + counts.expiring} occupied · {counts.free} free
              · {counts.expiring} expiring · {counts.maintenance} maintenance
            </CardDescription>
          </div>

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

      <CardContent className="flex-1 p-4 overflow-y-auto bg-muted/10 min-h-72">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-48">
            <p className="text-muted-foreground text-sm font-medium">
              No seats match the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))' }}>
            {filtered.map(seat => (
              <AdminDashboardSeatCell
                key={seat.id}
                id={seat.id}
                status={seat.status}
                occupant={seat.occupant}
                shift={seat.shift}
                expiry={seat.expiry}
                onClick={() => handleSeatClick(seat)}
              />
            ))}
          </div>
        )}
      </CardContent>

      <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-muted/30 border-t">
        <span className="text-xs font-semibold text-muted-foreground mr-1">Legend:</span>
        {LEGEND.map(l => (
          <Badge key={l.label} variant="secondary" className={`${l.cls} border-none`}>
            {l.label}
          </Badge>
        ))}
      </div>

      <CardFooter className="flex flex-wrap items-center gap-3 py-3 px-4 bg-muted/10 border-t">
        <span className="text-xs font-semibold text-muted-foreground">Filter:</span>

        <Select value={appliedShift} onValueChange={setAppliedShift}>
          <SelectTrigger className="w-36 h-8 text-xs">
            <SelectValue placeholder="All Shifts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Shifts</SelectItem>
            {shifts.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={feeFilter} onValueChange={setFeeFilter}>
          <SelectTrigger className="w-36 h-8 text-xs">
            <SelectValue placeholder="All Fee Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Fee Status</SelectItem>
            <SelectItem value="Due">Due</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleApplyFilters} size="sm" variant="default" className="h-8 text-xs">
          Apply Filter
        </Button>

        {(appliedFee !== 'All' || appliedShift !== 'All') && (
          <Button onClick={handleClearFilters} size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground">
            Clear
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
