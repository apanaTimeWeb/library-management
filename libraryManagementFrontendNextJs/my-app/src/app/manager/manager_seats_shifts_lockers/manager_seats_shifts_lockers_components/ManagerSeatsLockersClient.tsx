import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';
// @ts-nocheck
'use client';
// RESPONSIBILITY: Renders the ManagerSeatsLockersClient.tsx component UI.
import { useState, useMemo } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { Plus, ChevronDown, Search, UserPlus, Unlock, Wrench } from 'lucide-react';
import toast from 'react-hot-toast';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const STATUS_CLASS: Record<any, string> = {
  Free: 'ss-badge ss-badge--success',
  Occupied: 'ss-badge ss-badge--danger',
  Maintenance: 'ss-badge ss-badge--warning',
};

function numberCell(props: { value: string }) {
  return <span className="ss-table__seat-no">{props.value}</span>;
}

function anyCell(props: { value: string }) {
  return (
    <span className={STATUS_CLASS[props.value as any] ?? 'ss-badge ss-badge--inactive'}>
      <span className="ss-badge__dot" />{props.value}
    </span>
  );
}

function AssignedToCell(props: { data: Locker }) {
  if (props.data?.assignedTo === '—') return <span className="ss-table__cell-muted">Unassigned</span>;
  return (
    <div className="ss-cell-stack">
      <p className="ss-cell-name">{props.data?.assignedTo}</p>
      <p className="ss-table__cell-sub">{props.data?.studentId}</p>
    </div>
  );
}

export function ManagerSeatsLockersClient() {
const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '');

  const [lockers, setLockers] = useState<Locker[]>(INITIAL_LOCKERS);
  const [statusFilter, setStatusFilter] = useUrlState('statusFilter', 'All Statuses');
  const [showAssign, setShowAssign] = useState<Locker | null>(null);
  const [assignSearch, setAssignSearch] = useUrlState('assignSearch', '');
  const [freeTarget, setFreeTarget] = useState<Locker | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newnumber, setNewnumber] = useState('');
  const [addError, setAddError] = useState('');


  const filtered = lockers.filter(l => statusFilter === 'All Statuses' || l.status === statusFilter)
    .filter(item => 
      !searchTerm || 
      item.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (item.assignedTo && item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  const table = useClientTable(filtered, 10);


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
            <ManagerSearchableDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: 'All Statuses', value: 'All Statuses' },
                { label: 'Free', value: 'Free' },
                { label: 'Occupied', value: 'Occupied' },
                { label: 'Maintenance', value: 'Maintenance' }
              ]}
            />
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
<>
<div className="flex justify-end mb-[16px]">
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-bg-pageg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
          <div className="w-full overflow-x-auto border border-border rounded-xl">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-pageg-elevated border-b border-border">
                <tr className="text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">LOCKER #</th>
                  <th className="px-4 py-3 font-semibold">STATUS</th>
                  <th className="px-4 py-3 font-semibold">ASSIGNED TO</th>
                  <th className="px-4 py-3 font-semibold">SINCE</th>
                  <th className="px-4 py-3 font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-bg-pageg-card">
                {table.paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-bg-pageg-page transition-colors">
                    <td className="px-4 py-4"><span className="ss-table__seat-no">{row.number}</span></td>
                    <td className="px-4 py-4"><span className="text-text-primary font-semibold">{row.status}</span></td>
                    <td className="px-4 py-4"><AssignedToCell data={row} /></td>
                    <td className="px-4 py-4 text-text-secondary">{row.assignedSince}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex gap-2 items-center justify-end">
                        {row.status === 'Free' && (
                          <button className="ss-btn-icon" title="Assign Student" onClick={() => setShowAssign(row)}>
                            <UserPlus size={13} />
                          </button>
                        )}
                        {row.status === 'Occupied' && (
                          <button className="ss-btn-icon" title="Free Locker" onClick={() => setFreeTarget(row)}>
                            <Unlock size={13} />
                          </button>
                        )}
                        {row.status !== 'Maintenance' && (
                          <button className="ss-btn-icon" title="Mark Maintenance" onClick={() => handleMarkMaintenance(row)}>
                            <Wrench size={13} />
                          </button>
                        )}
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
