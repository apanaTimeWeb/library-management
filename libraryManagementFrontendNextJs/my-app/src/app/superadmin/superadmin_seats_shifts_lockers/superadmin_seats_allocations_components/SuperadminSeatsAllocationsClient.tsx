'use client';
// RESPONSIBILITY: Renders the Allocations Data Table using Tailwind CSS. Replaces Ag-Grid to comply with design system.

import { SuperadminCard, CardContent } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { SuperadminInput } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminInput';
import { SuperadminSelect, SuperadminSelectTrigger, SuperadminSelectValue, SuperadminSelectContent, SuperadminSelectItem } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSelect';
import { Download, ChevronRight, Inbox } from 'lucide-react';
import { useSuperadminSeatsAllocations } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_allocations_hooks/useSuperadminSeatsAllocations';
import { SuperadminSeatsAllocation } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsAllocationsTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

export function SuperadminSeatsAllocationsClient() {
    const table = useClientTable(filteredAllocations);
  const {
    shiftFilter,
    setShiftFilter,
    statusFilter,
    setStatusFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    filteredAllocations,
    handleExport,
    handleRowClick
  } = useSuperadminSeatsAllocations();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Expired': return 'danger';
      case 'Suspended': return 'warning';
      default: return 'default';
    }
  };

  const getDaysLeftBadge = (days: number) => {
    if (days < 0) return <SuperadminBadge variant="danger">{Math.abs(days)}d ago</SuperadminBadge>;
    if (days <= 7) return <SuperadminBadge variant="danger">{days}d left</SuperadminBadge>;
    if (days <= 15) return <SuperadminBadge variant="warning">{days}d left</SuperadminBadge>;
    return <SuperadminBadge variant="success">{days}d left</SuperadminBadge>;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
            <span>Seats</span><ChevronRight size={12} /><span>Allocations</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Allocations</h1>
          <p className="text-text-secondary mt-1 text-sm">All active and past seat allocations</p>
        </div>
        <SuperadminButton id="export-allocations-btn" onClick={handleExport} variant="secondary">
          <Download size={16} className="mr-2" /> Export
        </SuperadminButton>
      </div>

      <SuperadminCard className="mb-6 bg-card border-none">
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
          <div className="w-40">
            <SuperadminSelect value={shiftFilter} onValueChange={setShiftFilter}>
              <SuperadminSelectTrigger id="filter-shift"><SuperadminSelectValue placeholder="All Shifts" /></SuperadminSelectTrigger>
              <SuperadminSelectContent>
                <SuperadminSelectItem value="All Shifts">All Shifts</SuperadminSelectItem>
                <SuperadminSelectItem value="Morning">Morning</SuperadminSelectItem>
                <SuperadminSelectItem value="Evening">Evening</SuperadminSelectItem>
                <SuperadminSelectItem value="Full Day">Full Day</SuperadminSelectItem>
              </SuperadminSelectContent>
            </SuperadminSelect>
          </div>
          <div className="w-40">
            <SuperadminSelect value={statusFilter} onValueChange={setStatusFilter}>
              <SuperadminSelectTrigger id="filter-status"><SuperadminSelectValue placeholder="All Statuses" /></SuperadminSelectTrigger>
              <SuperadminSelectContent>
                <SuperadminSelectItem value="All Statuses">All Statuses</SuperadminSelectItem>
                <SuperadminSelectItem value="Active">Active</SuperadminSelectItem>
                <SuperadminSelectItem value="Expired">Expired</SuperadminSelectItem>
                <SuperadminSelectItem value="Suspended">Suspended</SuperadminSelectItem>
              </SuperadminSelectContent>
            </SuperadminSelect>
          </div>
          <div className="w-40">
            <SuperadminInput id="filter-date-from" type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div className="w-40">
            <SuperadminInput id="filter-date-to" type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
        </CardContent>
      </SuperadminCard>

      <SuperadminCard>
        <CardContent className="p-0">
          {filteredAllocations.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 bg-input rounded-full flex items-center justify-center text-text-secondary mb-3">
                <Inbox size={32} />
              </div>
              <p className="text-text-primary font-semibold text-lg">No allocations found</p>
              <p className="text-text-secondary text-sm mt-1">Adjust your filters to see results.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-surface text-text-secondary text-xs uppercase tracking-wider font-semibold">
                    <th className="py-4 pl-4 pr-3">Student</th>
                    <th className="py-4 px-3">Seat #</th>
                    <th className="py-4 px-3">Shift</th>
                    <th className="py-4 px-3">Custom Slots</th>
                    <th className="py-4 px-3">Locker #</th>
                    <th className="py-4 px-3">From</th>
                    <th className="py-4 px-3">Till</th>
                    <th className="py-4 px-3">Days Left</th>
                    <th className="py-4 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 bg-surface">
                  {table.paginatedData.map((alloc, idx) => (
                    <tr
                      key={`${alloc.smartId}-${idx}`}
                      onClick={() => handleRowClick(alloc.studentName)}
                      className="hover:bg-input transition-colors cursor-pointer group"
                    >
                      <td className="py-3 pl-4 pr-3">
                        <p className="font-semibold text-text-primary">{alloc.studentName}</p>
                        <p className="text-xs text-text-secondary">{alloc.smartId}</p>
                      </td>
                      <td className="py-3 px-3 font-mono font-medium text-text-primary">{alloc.seatNo}</td>
                      <td className="py-3 px-3 text-text-secondary">{alloc.shift}</td>
                      <td className="py-3 px-3 text-text-secondary">{alloc.customSlots}</td>
                      <td className="py-3 px-3 text-text-secondary">{alloc.lockerNo}</td>
                      <td className="py-3 px-3 text-text-secondary">{alloc.validFrom}</td>
                      <td className="py-3 px-3 text-text-secondary">{alloc.validTill}</td>
                      <td className="py-3 px-3">{getDaysLeftBadge(alloc.daysLeft)}</td>
                      <td className="py-3 px-3">
                        <SuperadminBadge variant={getStatusVariant(alloc.status)}>
                          {alloc.status}
                        </SuperadminBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
            </div>
          )}
        </CardContent>
      </SuperadminCard>
    </div>
  );
}
