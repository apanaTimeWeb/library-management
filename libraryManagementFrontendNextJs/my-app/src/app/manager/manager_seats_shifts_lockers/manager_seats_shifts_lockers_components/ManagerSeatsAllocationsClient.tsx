'use client';
// RESPONSIBILITY: Renders the ManagerSeatsAllocationsClient.tsx component UI.
import { useMemo, useState, useEffect } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { Download, Eye } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { gridTheme } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shared_components/gridTheme';
import toast from 'react-hot-toast';
import { useSeatsStore } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_context/manager_seats_shifts_lockers_store';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';

ModuleRegistry.registerModules([AllCommunityModule]);

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
  const [searchTerm, setSearchTerm] = useState('');

  const [shiftFilter, setShiftFilter] = useState('All Shifts');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const { allocationsData, status, fetchAllocationsData } = useSeatsStore();

  useEffect(() => {
    if (status === 'idle' || allocationsData.length === 0) {
      fetchAllocationsData();
    }
  }, [status, allocationsData.length, fetchAllocationsData]);

  const filtered = (allocationsData as Allocation[]).filter((a) => {
    const matchShift = shiftFilter === 'All Shifts' || a.shift === shiftFilter;
    const matchStatus = statusFilter === 'All Statuses' || a.status === statusFilter;
    const matchFrom = !dateFrom || a.validFrom >= dateFrom;
    const matchTo = !dateTo || a.validTill <= dateTo;
    return matchShift && matchStatus && matchFrom && matchTo;
  });

  const colDefs: ColDef<Allocation>[] = useMemo(() => [
    { field: 'studentName', headerName: 'STUDENT', flex: 2, cellRenderer: StudentCell },
    { field: 'seatNo', headerName: 'SEAT #', flex: 0.8, cellClass: 'ss-table__seat-no' },
    { field: 'shift', headerName: 'SHIFT', flex: 1, cellClass: 'ss-cell-secondary' },
    { field: 'customSlots', headerName: 'CUSTOM SLOTS', flex: 1.8, cellClass: 'ss-cell-secondary' },
    { field: 'lockerNo', headerName: 'LOCKER #', flex: 0.8, cellClass: 'ss-cell-secondary' },
    { field: 'validFrom', headerName: 'FROM', flex: 1.3, cellClass: 'ss-cell-secondary' },
    { field: 'validTill', headerName: 'TILL', flex: 1.3, cellClass: 'ss-cell-secondary' },
    { field: 'daysLeft', headerName: 'DAYS LEFT', flex: 1, cellRenderer: DaysLeftCell },
    { field: 'status', headerName: 'STATUS', flex: 1.2, cellRenderer: StatusCell },
    { headerName: 'ACTIONS', flex: 0.8, sortable: false, cellRenderer: ActionsCell },
  ], []);

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
<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
<div className="ss-table-wrapper ss-grid-h-400">
            <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10} theme={gridTheme} rowData={filtered} columnDefs={colDefs} rowHeight={52} headerHeight={40} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false, sortable: true }} />
          </div>
        </>
)}
      </div>
    </>
  );
}
