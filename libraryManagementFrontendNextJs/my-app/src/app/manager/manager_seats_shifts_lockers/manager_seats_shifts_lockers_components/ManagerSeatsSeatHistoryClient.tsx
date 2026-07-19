'use client';
// RESPONSIBILITY: Renders the ManagerSeatsSeatHistoryClient.tsx component UI.
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { useMemo, useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useSeatsStore } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_store/manager_seats_shifts_lockers_store';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { useManagerSeatsSeatHistory } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_hooks/useManagerSeatsSeatHistory';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const REASON_CLASS: Record<string, string> = {
  Admission: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-success/15 text-success border border-success/20',
  'Shift Change': 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-info/15 text-info border border-info/20',
  'Seat Change': 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-warning/15 text-warning border border-warning/20',
};

function StudentCell(props: { data: SeatHistoryEntry }) {
  return <span className="font-semibold text-text-primary text-sm">{props.data?.studentName}</span>;
}

function ReasonCell(props: { value: string }) {
  return <span className={REASON_CLASS[props.value] ?? 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-border/50 text-text-secondary border border-border'}>{props.value}</span>;
}

export function ManagerSeatsSeatHistoryClient() {
const {
    searchTerm,
    setSearchTerm,
    seatFilter,
    setSeatFilter,
    search,
    setSearch,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    page,
    setPage,
    limit,
    setLimit,
    filtered,
  }
 = useManagerSeatsSeatHistory();
  const table = useClientTable(filtered, 10);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Seat History</h1>
          <p className="text-text-secondary mt-1 text-sm">Complete occupancy history for every seat</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-1 rounded-xl bg-bg-elevated inline-flex w-fit">
        <div className="w-full md:w-64 relative">
          <ManagerSearchableDropdown
            value={seatFilter}
            onChange={setSeatFilter}
            options={[
              { label: 'All Seats', value: 'All Seats' },
              { label: 'S-07', value: 'S-07' },
              { label: 'S-12', value: 'S-12' },
              { label: 'S-31', value: 'S-31' }
            ]}
          />
        </div>
        <div className="relative w-full max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input type="text" placeholder="Search by student name or ID..." className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="relative w-full max-w-md">
          <input type="date" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </div>
        <div className="relative w-full max-w-md">
          <input type="date" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-card rounded-xl border border-dashed border-border text-center space-y-4 max-w-2xl mx-auto mt-12">
          <p className="text-5xl mb-2">Ã°Å¸“Å“</p>
          <p className="text-lg font-semibold text-text-primary">No seat history records found.</p>
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto border border-border rounded-xl">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-card border-b border-border">
                <tr className="text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">SEAT #</th>
                  <th className="px-4 py-3 font-semibold">STUDENT</th>
                  <th className="px-4 py-3 font-semibold">SMART ID</th>
                  <th className="px-4 py-3 font-semibold">SHIFT</th>
                  <th className="px-4 py-3 font-semibold">FROM</th>
                  <th className="px-4 py-3 font-semibold">TILL</th>
                  <th className="px-4 py-3 font-semibold">DURATION</th>
                  <th className="px-4 py-3 font-semibold">REASON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {table.paginatedData.map((row, i) => (
                  <tr key={i} className="hover:bg-page transition-colors">
                    <td className="px-4 py-4 font-semibold text-text-primary">{row.seatNo}</td>
                    <td className="px-4 py-4"><StudentCell data={row} /></td>
                    <td className="px-4 py-4 text-text-secondary">{row.smartId}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.shift}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.occupiedFrom}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.occupiedTill}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.duration}</td>
                    <td className="px-4 py-4"><ReasonCell value={row.reason || ''} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
          </div>
          
        </>
      )}
    </div>
  );
}
