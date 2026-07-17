'use client';

import { Download, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAllocations } from '@/app/admin/admin_seats_shifts_lockers/allocations/admin_seats_shifts_lockers_hooks/useAllocations';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AllocationsClient() {
  const {
    shiftFilter,
    setShiftFilter,
    statusFilter,
    setStatusFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    filtered
  } = useAllocations();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-none';
      case 'Expired': return 'bg-danger/10 text-danger border-none';
      case 'Suspended': return 'bg-warning/10 text-warning border-none';
      default: return 'bg-muted text-muted-foreground border-none';
    }
  };

  const renderDaysLeft = (daysLeft: number) => {
    if (daysLeft < 0) return <Badge variant="secondary" className="bg-danger/10 text-danger border-none">{Math.abs(daysLeft)}d ago</Badge>;
    if (daysLeft <= 7) return <Badge variant="secondary" className="bg-danger/10 text-danger border-none">{daysLeft}d left</Badge>;
    if (daysLeft <= 15) return <Badge variant="secondary" className="bg-warning/10 text-warning border-none">{daysLeft}d left</Badge>;
    return <Badge variant="secondary" className="bg-success/10 text-success border-none">{daysLeft}d left</Badge>;
  };

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Seats & Shifts</nav>
          <h1 className="text-2xl font-bold tracking-tight">Allocations</h1>
          <p className="text-sm text-muted-foreground mt-1">All active and past seat allocations.</p>
        </div>
        <Button 
          onClick={() => toast.success('Exporting allocations...')} 
          variant="secondary" 
          className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold gap-2"
        >
          <Download size={16} /> Export
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <select 
          className="h-10 px-3 rounded-md border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
          value={shiftFilter} 
          onChange={(e) => setShiftFilter(e.target.value)}
        >
          <option value="All Shifts">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Full Day">Full Day</option>
        </select>
        
        <select 
          className="h-10 px-3 rounded-md border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Statuses">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Suspended">Suspended</option>
        </select>

        <Input 
          type="date" 
          className="h-10 w-[140px]" 
          value={dateFrom} 
          onChange={e => setDateFrom(e.target.value)} 
        />
        <Input 
          type="date" 
          className="h-10 w-[140px]" 
          value={dateTo} 
          onChange={e => setDateTo(e.target.value)} 
        />
      </div>

      {/* Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col min-h-[450px]">
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap min-w-max">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Seat #</th>
                <th className="px-5 py-3">Shift</th>
                <th className="px-5 py-3">Custom Slots</th>
                <th className="px-5 py-3">Locker #</th>
                <th className="px-5 py-3">From</th>
                <th className="px-5 py-3">Till</th>
                <th className="px-5 py-3">Days Left</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">📂</div>
                      <p className="text-lg font-bold">No allocations found.</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((a, i) => (
                  <tr key={i} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-primary">{a.studentName}</span>
                        <span className="text-xs text-muted-foreground">{a.smartId}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm font-black text-primary">{a.seatNo}</td>
                    <td className="px-5 py-3 font-medium text-sm text-primary">{a.shift}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{a.customSlots || '—'}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground font-mono">{a.lockerNo || '—'}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{a.validFrom}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{a.validTill}</td>
                    <td className="px-5 py-3">
                      {renderDaysLeft(a.daysLeft)}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant="secondary" className={`${getStatusBadge(a.status)} uppercase tracking-wider font-bold text-xs`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
                        {a.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="View Profile">
                        <Eye size={16} />
                      </Button>
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
