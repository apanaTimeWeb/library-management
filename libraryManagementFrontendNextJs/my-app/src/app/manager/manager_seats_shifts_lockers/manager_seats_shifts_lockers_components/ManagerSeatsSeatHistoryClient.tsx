// @ts-nocheck
'use client';
// RESPONSIBILITY: Renders the ManagerSeatsSeatHistoryClient.tsx component UI.
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';
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
  Admission: 'ss-badge ss-badge--success',
  'Shift Change': 'ss-badge ss-badge--info',
  'Seat Change': 'ss-badge ss-badge--warning',
};

function StudentCell(props: { data: SeatHistoryEntry }) {
  return <span className="ss-cell-name">{props.data?.studentName}</span>;
}

function ReasonCell(props: { value: string }) {
  return <span className={REASON_CLASS[props.value] ?? 'ss-badge ss-badge--inactive'}>{props.value}</span>;
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
    <div className="ss-page">
      <div className="ss-page-header">
        <div>
          <h1 className="ss-page-title">Seat History</h1>
          <p className="ss-page-subtitle">Complete occupancy history for every seat</p>
        </div>
      </div>

      <div className="ss-filter-bar">
        <div className="ss-filter-bar__select-wrap">
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
        <div className="ss-filter-bar__input-wrap">
          <Search size={14} className="ss-input-icon" />
          <input type="text" placeholder="Search by student name or ID..." className="ss-input" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="ss-filter-bar__input-wrap">
          <input type="date" className="ss-input ss-input--no-icon" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </div>
        <div className="ss-filter-bar__input-wrap">
          <input type="date" className="ss-input ss-input--no-icon" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="ss-empty-state">
          <p className="ss-empty-state__icon">📜</p>
          <p className="ss-empty-state__title">No seat history records found.</p>
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto border border-border rounded-xl">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-elevated border-b border-border">
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
              <tbody className="divide-y divide-border bg-bg-card">
                {table.paginatedData.map((row, i) => (
                  <tr key={i} className="hover:bg-bg-page transition-colors">
                    <td className="px-4 py-4 font-semibold text-text-primary">{row.seatNo}</td>
                    <td className="px-4 py-4"><StudentCell data={row} /></td>
                    <td className="px-4 py-4 text-text-secondary">{row.smartId}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.shift}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.occupiedFrom}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.occupiedTill}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.duration}</td>
    // @ts-ignore
                    <td className="px-4 py-4"><ReasonCell value={row.reason} /></td>
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
