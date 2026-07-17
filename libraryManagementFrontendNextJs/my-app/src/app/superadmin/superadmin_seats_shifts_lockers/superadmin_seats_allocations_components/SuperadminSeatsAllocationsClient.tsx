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

export function SuperadminSeatsAllocationsClient() {
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
      default: return 'outline';
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
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium tracking-wide mb-1">
            <span>Seats</span><ChevronRight size={12} /><span>Allocations</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface">Allocations</h1>
          <p className="text-on-surface-variant mt-1 text-sm">All active and past seat allocations</p>
        </div>
        <SuperadminButton id="export-allocations-btn" onClick={handleExport} variant="secondary">
          <Download size={16} className="mr-2" /> Export
        </SuperadminButton>
      </div>

      <SuperadminCard className="mb-6 bg-surface-container-high border-none">
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
              <div className="h-16 w-16 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant mb-3">
                <Inbox size={32} />
              </div>
              <p className="text-on-surface font-semibold text-lg">No allocations found</p>
              <p className="text-on-surface-variant text-sm mt-1">Adjust your filters to see results.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface text-on-surface-variant text-xs uppercase tracking-wider font-semibold">
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
                  {filteredAllocations.map((alloc, idx) => (
                    <tr
                      key={`${alloc.smartId}-${idx}`}
                      onClick={() => handleRowClick(alloc.studentName)}
                      className="hover:bg-surface-container-highest transition-colors cursor-pointer group"
                    >
                      <td className="py-3 pl-4 pr-3">
                        <p className="font-semibold text-on-surface">{alloc.studentName}</p>
                        <p className="text-xs text-on-surface-variant">{alloc.smartId}</p>
                      </td>
                      <td className="py-3 px-3 font-mono font-medium text-on-surface">{alloc.seatNo}</td>
                      <td className="py-3 px-3 text-on-surface-variant">{alloc.shift}</td>
                      <td className="py-3 px-3 text-on-surface-variant">{alloc.customSlots}</td>
                      <td className="py-3 px-3 text-on-surface-variant">{alloc.lockerNo}</td>
                      <td className="py-3 px-3 text-on-surface-variant">{alloc.validFrom}</td>
                      <td className="py-3 px-3 text-on-surface-variant">{alloc.validTill}</td>
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
            </div>
          )}
        </CardContent>
      </SuperadminCard>
    </div>
  );
}
