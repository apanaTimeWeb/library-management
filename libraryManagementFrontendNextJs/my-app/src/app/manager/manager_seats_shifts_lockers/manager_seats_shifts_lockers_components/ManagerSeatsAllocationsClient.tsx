'use client';
// RESPONSIBILITY: Renders the ManagerSeatsAllocationsClient.tsx component UI.
import { useMemo, useState, useEffect } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { Download, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSeatsStore } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_context/manager_seats_shifts_lockers_store';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { useManagerSeatsAllocations } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_hooks/useManagerSeatsAllocations';
const STATUS_CLASS: Record<string, string> = {
  Active: 'ss-badge ss-badge--success',
  Expired: 'ss-badge ss-badge--danger',
  Suspended: 'ss-badge ss-badge--warning',
};

function StudentCell(props: { data: Allocation }) {
  return (
    <div className="ss-cell-stack">
      <p className="ss-cell-name">{props.data?.studentName}</p>
      <p className="ss-table__cell-sub">{props.data?.smartId}</p>
    </div>
  );
}

function DaysLeftCell(props: { value: number }) {
  if (props.value < 0) return <span className="ss-badge ss-badge--danger">{Math.abs(props.value)}d ago</span>;
  if (props.value <= 7) return <span className="ss-badge ss-badge--danger">{props.value}d left</span>;
  if (props.value <= 15) return <span className="ss-badge ss-badge--warning">{props.value}d left</span>;
  return <span className="ss-badge ss-badge--success">{props.value}d left</span>;
}

function StatusCell(props: { value: string }) {
  return <span className={STATUS_CLASS[props.value] ?? 'ss-badge ss-badge--inactive'}><span className="ss-badge__dot" />{props.value}</span>;
}

function ActionsCell(props: { data: Allocation }) {
  return (
    <div className="ss-cell-actions">
      <button className="ss-btn-icon" title="View Student" onClick={() => toast.success(`Viewing ${props.data?.studentName}`)}>
        <Eye size={13} />
      </button>
    </div>
  );
}

export function ManagerSeatsAllocationsClient() {
  const {
    searchTerm,
    setSearchTerm,
    shiftFilter,
    setShiftFilter,
    statusFilter,
    setStatusFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    page,
    setPage,
    limit,
    setLimit,
    filtered,
  } = useManagerSeatsAllocations();


  return (
    <>
      <div className="ss-page">
        <div className="ss-page-header">
          <div>
            <h1 className="ss-page-title">Allocations</h1>
            <p className="ss-page-subtitle">All active and past seat allocations</p>
          </div>
          <button className="ss-btn-ghost ss-btn-start" onClick={() => toast.success('Exporting...')}>
            <Download size={15} />Export
          </button>
        </div>

        <div className="ss-filter-bar">
          <div className="ss-filter-bar__select-wrap">
            <ManagerSearchableDropdown
              value={shiftFilter}
              onChange={setShiftFilter}
              options={[
                { label: 'All Shifts', value: 'All Shifts' },
                { label: 'Morning', value: 'Morning' },
                { label: 'Evening', value: 'Evening' },
                { label: 'Full Day', value: 'Full Day' }
              ]}
            />
          </div>
          <div className="ss-filter-bar__select-wrap">
            <ManagerSearchableDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: 'All Statuses', value: 'All Statuses' },
                { label: 'Active', value: 'Active' },
                { label: 'Expired', value: 'Expired' },
                { label: 'Suspended', value: 'Suspended' }
              ]}
            />
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
            <p className="ss-empty-state__icon">📋</p>
            <p className="ss-empty-state__title">No allocations found.</p>
          </div>
        ) : (
<>
<div className="flex justify-end mb-[16px]">
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
          <div className="w-full overflow-x-auto border border-border rounded-xl">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-elevated border-b border-border">
                <tr className="text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">STUDENT</th>
                  <th className="px-4 py-3 font-semibold">SEAT #</th>
                  <th className="px-4 py-3 font-semibold">SHIFT</th>
                  <th className="px-4 py-3 font-semibold">CUSTOM SLOTS</th>
                  <th className="px-4 py-3 font-semibold">LOCKER #</th>
                  <th className="px-4 py-3 font-semibold">FROM</th>
                  <th className="px-4 py-3 font-semibold">TILL</th>
                  <th className="px-4 py-3 font-semibold">DAYS LEFT</th>
                  <th className="px-4 py-3 font-semibold">STATUS</th>
                  <th className="px-4 py-3 font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-bg-card">
                {filtered.slice((page - 1) * limit, page * limit).map((row) => (
                  <tr key={row.id} className="hover:bg-bg-page transition-colors">
                    <td className="px-4 py-4"><StudentCell data={row} /></td>
                    <td className="px-4 py-4"><span className="ss-table__seat-no">{row.seatNo}</span></td>
                    <td className="px-4 py-4 text-text-secondary">{row.shift}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.customSlots}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.lockerNo}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.validFrom}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.validTill}</td>
                    <td className="px-4 py-4"><DaysLeftCell value={row.daysLeft} /></td>
                    <td className="px-4 py-4"><StatusCell value={row.status} /></td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex gap-2 items-center justify-end">
                        <button className="ss-btn-icon" title="View Student" onClick={() => toast.success(`Viewing ${row.studentName}`)}>
                          <Eye size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            page={page}
            limit={limit}
            totalItems={filtered.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </>
)}
      </div>
    </>
  );
}
