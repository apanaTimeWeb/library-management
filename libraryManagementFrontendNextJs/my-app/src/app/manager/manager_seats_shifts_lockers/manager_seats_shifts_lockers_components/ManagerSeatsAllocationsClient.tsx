'use client';
// RESPONSIBILITY: Renders the ManagerSeatsAllocationsClient.tsx component UI.
import { useMemo, useState, useEffect } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { Download, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSeatsStore } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_store/manager_seats_shifts_lockers_store';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { useManagerSeatsAllocations } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_hooks/useManagerSeatsAllocations';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const STATUS_CLASS: Record<string, string> = {
  Active: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-success/15 text-success border border-success/20',
  Expired: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-danger/15 text-danger border border-danger/20',
  Suspended: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-warning/15 text-warning border border-warning/20',
};

function StudentCell(props: { data: Allocation }) {
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-text-primary text-sm">{props.data?.studentName}</p>
      <p className="text-xs text-text-secondary mt-0.5">{props.data?.smartId}</p>
    </div>
  );
}

function DaysLeftCell(props: { value: number }) {
  if (props.value < 0) return <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-danger/15 text-danger border border-danger/20">{Math.abs(props.value)}d ago</span>;
  if (props.value <= 7) return <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-danger/15 text-danger border border-danger/20">{props.value}d left</span>;
  if (props.value <= 15) return <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-warning/15 text-warning border border-warning/20">{props.value}d left</span>;
  return <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-success/15 text-success border border-success/20">{props.value}d left</span>;
}

function StatusCell(props: { value: string }) {
  return <span className={STATUS_CLASS[props.value] ?? 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-border/50 text-text-secondary border border-border'}><span className="w-1.5 h-1.5 rounded-full bg-current" />{props.value}</span>;
}

function ActionsCell(props: { data: Allocation }) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors flex-shrink-0" title="View Student" onClick={() => toast.success(`Viewing ${props.data?.studentName}`)}>
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
  }
 = useManagerSeatsAllocations();
  const table = useClientTable(filtered, 10);

  return (
    <>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Allocations</h1>
            <p className="text-text-secondary mt-1 text-sm">All active and past seat allocations</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm self-start md:self-auto" onClick={() => toast.success('Exporting...')}>
            <Download size={15} />Export
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-1 rounded-xl bg-bg-elevated inline-flex w-fit">
          <div className="w-full md:w-64 relative">
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
          <div className="w-full md:w-64 relative">
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
          <div className="relative w-full max-w-md">
            <input type="date" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div className="relative w-full max-w-md">
            <input type="date" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 bg-card rounded-xl border border-dashed border-border text-center space-y-4 max-w-2xl mx-auto mt-12">
            <p className="text-5xl mb-2">Ã°Å¸“â€¹</p>
            <p className="text-lg font-semibold text-text-primary">No allocations found.</p>
          </div>
        ) : (
<>
<div className="flex justify-end mb-[16px]">
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
          <div className="w-full overflow-x-auto border border-border rounded-xl">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-card border-b border-border">
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
              <tbody className="divide-y divide-border bg-card">
                {table.paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-page transition-colors">
                    <td className="px-4 py-4"><StudentCell data={row} /></td>
                    <td className="px-4 py-4"><span className="font-mono font-bold text-text-primary bg-bg-elevated px-2 py-1 rounded border border-border text-sm">{row.seatNo}</span></td>
                    <td className="px-4 py-4 text-text-secondary">{row.shift}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.customSlots}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.lockerNo}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.validFrom}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.validTill}</td>
                    <td className="px-4 py-4"><DaysLeftCell value={row.daysLeft || 0} /></td>
                    <td className="px-4 py-4"><StatusCell value={row.status} /></td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex gap-2 items-center justify-end">
                        <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors flex-shrink-0" title="View Student" onClick={() => toast.success(`Viewing ${row.studentName}`)}>
                          <Eye size={13} />
                        </button>
                      </div>
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
          
        </>
)}
      </div>
    </>
  );
}
