// @ts-nocheck
// RESPONSIBILITY: Renders the ManagerSeatsLockersClient.tsx component UI.
'use client';
import { useState, useMemo } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { Plus, ChevronDown, Search, UserPlus, Unlock, Wrench } from 'lucide-react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { AgGridReact } from 'ag-grid-react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { gridTheme } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shared_components/gridTheme';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import toast from 'react-hot-toast';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';

ModuleRegistry.registerModules([AllCommunityModule]);

type LockerStatus = 'Free' | 'Occupied' | 'Maintenance';

// Locker type centralized.

// INITIAL_LOCKERS centralized.

const STATUS_CLASS: Record<LockerStatus, string> = {
  Free: 'ss-badge ss-badge--success',
  Occupied: 'ss-badge ss-badge--danger',
  Maintenance: 'ss-badge ss-badge--warning',
};

function numberCell(props: { value: string }) {
  return <span className="ss-table__seat-no">{props.value}</span>;
}

function LockerStatusCell(props: { value: string }) {
  return (
    <span className={STATUS_CLASS[props.value as LockerStatus] ?? 'ss-badge ss-badge--inactive'}>
      <span className="ss-badge__dot" />{props.value}
    </span>
  );
}

function AssignedToCell(props: { data: Locker }) {
  if (props.data.assignedTo === '—') return <span className="ss-table__cell-muted">Unassigned</span>;
  return (
    <div className="ss-cell-stack">
      <p className="ss-cell-name">{props.data.assignedTo}</p>
      <p className="ss-table__cell-sub">{props.data.studentId}</p>
    </div>
  );
}

export function ManagerSeatsLockersClient() {
  const [lockers, setLockers] = useState<Locker[]>(INITIAL_LOCKERS);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [showAssign, setShowAssign] = useState<Locker | null>(null);
  const [assignSearch, setAssignSearch] = useState('');
  const [freeTarget, setFreeTarget] = useState<Locker | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newnumber, setNewnumber] = useState('');
  const [addError, setAddError] = useState('');

  const filtered = lockers.filter(l => statusFilter === 'All Statuses' || l.status === statusFilter);

  function handleAssign() {
    if (!showAssign || !assignSearch.trim()) return;
    setLockers(prev => prev.map(l => l.id === showAssign.id
      ? { ...l, status: 'Occupied', assignedTo: assignSearch, studentId: 'LIB-NEW', assignedSince: 'Today' }
      : l
    ));
    toast.success(`Locker ${showAssign.number} assigned to ${assignSearch}.`);
    setShowAssign(null);
    setAssignSearch('');
  }

  function handleFreeLocker() {
    if (!freeTarget) return;
    setLockers(prev => prev.map(l => l.id === freeTarget.id
      ? { ...l, status: 'Free', assignedTo: '—', studentId: '—', assignedSince: '—' }
      : l
    ));
    toast.success(`Locker ${freeTarget.number} is now free.`);
    setFreeTarget(null);
  }

  function handleMarkMaintenance(locker: Locker) {
    setLockers(prev => prev.map(l => l.id === locker.id ? { ...l, status: 'Maintenance' } : l));
    toast.success(`Locker ${locker.number} marked as Maintenance.`);
  }

  function handleAddLocker() {
    if (!newnumber.trim()) { setAddError('Locker ID is required'); return; }
    if (lockers.some(l => l.number === newnumber.trim())) { setAddError('Locker ID already exists'); return; }
    setLockers(prev => [...prev, {
      id: Date.now().toString(), number: newnumber.trim(),
      status: 'Free', assignedTo: '—', studentId: '—', assignedSince: '—',
    }]);
    toast.success(`Locker ${newnumber.trim()} added.`);
    setShowAddModal(false);
    setNewnumber('');
    setAddError('');
  }

  const colDefs: ColDef<Locker>[] = useMemo(() => [
    { field: 'number', headerName: 'LOCKER #', flex: 1, cellRenderer: numberCell },
    { field: 'status', headerName: 'STATUS', flex: 1.2, cellRenderer: LockerStatusCell },
    { field: 'assignedTo', headerName: 'ASSIGNED TO', flex: 2, cellRenderer: AssignedToCell },
    { field: 'assignedSince', headerName: 'SINCE', flex: 1.3, cellClass: 'ss-cell-secondary' },
    {
      headerName: 'ACTIONS', flex: 1.2, sortable: false,
      cellRenderer: (props: { value: string; data?: unknown }) => {
        const data = props.data as Locker;
        return (
          <div className="ss-cell-actions">
            {data.status === 'Available' && (
              <button className="ss-btn-icon" title="Assign Student" onClick={() => setShowAssign(data)}>
                <UserPlus size={13} />
              </button>
            )}
            {data.status === 'Occupied' && (
              <button className="ss-btn-icon" title="Free Locker" onClick={() => setFreeTarget(data)}>
                <Unlock size={13} />
              </button>
            )}
            {data.status !== 'Maintenance' && (
              <button className="ss-btn-icon" title="Mark Maintenance" onClick={() => handleMarkMaintenance(data)}>
                <Wrench size={13} />
              </button>
            )}
          </div>
        );
      },
    },
  ], []);

  return (
    <>
      <div className="ss-page">
        <div className="ss-page-header">
          <div>
            <h1 className="ss-page-title">Lockers</h1>
            <p className="ss-page-subtitle">Manage locker assignments and availability</p>
          </div>
          <button className="ss-btn-primary ss-btn-start" onClick={() => { setNewnumber(''); setAddError(''); setShowAddModal(true); }}>
            <Plus size={16} />Add Locker
          </button>
        </div>

        <div className="ss-filter-bar">
          <div className="ss-filter-bar__select-wrap">
            <select className="ss-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option>All Statuses</option>
              <option>Free</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
            <ChevronDown size={14} className="ss-select-icon" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="ss-empty-state">
            <p className="ss-empty-state__icon">🔒</p>
            <p className="ss-empty-state__title">No lockers added yet.</p>
            <button className="ss-btn-primary" onClick={() => { setNewnumber(''); setAddError(''); setShowAddModal(true); }}>
              <Plus size={15} />Add Locker
            </button>
          </div>
        ) : (
          <div className="ss-table-wrapper ss-grid-h-400">
            <AgGridReact theme={gridTheme} rowData={filtered} columnDefs={colDefs} rowHeight={52} headerHeight={40} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false, sortable: true }} />
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="ss-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            <h2 className="ss-modal-title">➕ Add Locker</h2>
            <div className="ss-form-field">
              <label className="ss-label">Locker ID <span className="ss-text-danger">*</span></label>
              <input
                className={`ss-input ss-input--no-icon${addError ? ' ss-input--error' : ''}`}
                placeholder="e.g. D01"
                value={newnumber}
                onChange={e => { setNewnumber(e.target.value); setAddError(''); }}
              />
              {addError && <p className="ss-error">{addError}</p>}
            </div>
            <div className="ss-modal-footer">
              <button className="ss-btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="ss-btn-primary" onClick={handleAddLocker}><Plus size={14} />Add</button>
            </div>
          </div>
        </div>
      )}

      {showAssign && (
        <div className="ss-modal-overlay" onClick={() => setShowAssign(null)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            <h2 className="ss-modal-title">👤 Assign Locker {showAssign.number}</h2>
            <div className="ss-form-field">
              <label className="ss-label">Student <span className="ss-text-danger">*</span></label>
              <div className="ss-filter-bar__input-wrap">
                <Search size={14} className="ss-input-icon" />
                <input className="ss-input" placeholder="Search by name or Smart ID..." value={assignSearch} onChange={e => setAssignSearch(e.target.value)} />
              </div>
            </div>
            <div className="ss-modal-footer">
              <button className="ss-btn-ghost" onClick={() => setShowAssign(null)}>Cancel</button>
              <button className="ss-btn-primary" onClick={handleAssign} disabled={!assignSearch.trim()}>
                <UserPlus size={14} />Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {freeTarget && (
        <div className="ss-modal-overlay" onClick={() => setFreeTarget(null)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            <h2 className="ss-modal-title">🔓 Free Locker {freeTarget.number}</h2>
            <p className="ss-modal-desc">
              Free Locker <strong>{freeTarget.number}</strong> from <strong>{freeTarget.assignedTo}</strong>? Locker becomes available immediately.
            </p>
            <div className="ss-modal-footer">
              <button className="ss-btn-ghost" onClick={() => setFreeTarget(null)}>Cancel</button>
              <button className="ss-btn-danger" onClick={handleFreeLocker}>Free Locker</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}




