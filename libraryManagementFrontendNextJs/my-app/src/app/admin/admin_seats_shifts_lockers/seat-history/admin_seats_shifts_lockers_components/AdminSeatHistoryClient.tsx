'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminSeatHistoryClient component.
import { useState } from 'react';
import { Download, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminSeatHistory } from '@/app/admin/admin_seats_shifts_lockers/seat-history/admin_seats_shifts_lockers_hooks/useAdminSeatHistory';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export function AdminSeatHistoryClient() {

  const {
    seatFilter,
    setSeatFilter,
    search,
    setSearch,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    filtered
  } = useAdminSeatHistory();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case 'Admission': return 'bg-success/10 text-success border-none';
      case 'Shift Change': return 'bg-info/10 text-info border-none';
      case 'Seat Change': return 'bg-warning/10 text-warning border-none';
      default: return 'bg-muted text-muted-foreground border-none';
    }
  };
    const table = useClientTable(filtered, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Seats & Shifts</nav>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Seat History</h1>
          <p className="text-sm text-muted-foreground mt-1">Historical logs of seat allocations and changes.</p>
        </div>
        <Button 
          onClick={() => toast.success('Exporting history...')} 
          variant="secondary" 
          className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold gap-2"
        >
          <Download size={16} /> Export
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="pl-9 h-10"
            placeholder="Search student or ID..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <AdminSearchableDropdown 
          className="h-10 px-3 rounded-md border border-border bg-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          value={seatFilter} 
          onChange={(e) => setSeatFilter(e.target.value)}
        >
          <option value="All Seats">All Seats</option>
          <option value="S-12">S-12</option>
          <option value="S-45">S-45</option>
        </AdminSearchableDropdown>
        <Input 
          type="date" 
          className="h-10 w-36" 
          value={dateFrom} 
          onChange={e => setDateFrom(e.target.value)} 
        />
        <Input 
          type="date" 
          className="h-10 w-36" 
          value={dateTo} 
          onChange={e => setDateTo(e.target.value)} 
        />
      </div>

      {/* Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col min-h-96">
        <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap min-w-max">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Seat #</th>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Smart ID</th>
                <th className="px-5 py-3">Shift</th>
                <th className="px-5 py-3">From</th>
                <th className="px-5 py-3">Till</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {table.paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">ðŸ“‹</div>
                      <p className="text-lg font-bold">No history found.</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.paginatedData.map((h, i) => (
                  <tr key={i} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4 text-sm font-black text-primary">{h.seatNo}</td>
                    <td className="px-5 py-4 font-bold text-sm text-primary">{h.studentName}</td>
                    <td className="px-5 py-4 text-xs font-mono text-muted-foreground">{h.smartId}</td>
                    <td className="px-5 py-4 font-medium text-sm text-primary">{h.shift}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{h.occupiedFrom}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{h.occupiedTill}</td>
                    <td className="px-5 py-4 text-sm font-medium text-primary">{h.duration}</td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary" className={`${getReasonBadge(h.reason)} uppercase tracking-wider font-bold text-xs`}>
                        {h.reason}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />
          <TablePagination
            page={page}
            limit={limit}
            totalItems={filtered.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>
    </div>
  );
}
