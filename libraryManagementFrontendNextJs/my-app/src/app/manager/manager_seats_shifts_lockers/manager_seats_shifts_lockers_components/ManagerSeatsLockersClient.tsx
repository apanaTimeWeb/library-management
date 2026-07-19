'use client';
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';

// RESPONSIBILITY: Renders the ManagerSeatsLockersClient.tsx component UI.
import { useState, useMemo } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { UserPlus, Wrench, Unlock, Plus, Search, ChevronDown, User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const STATUS_CLASS: Record<string, string> = {
  Free: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-success/15 text-success border border-success/20',
  Occupied: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-danger/15 text-danger border border-danger/20',
  Maintenance: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-warning/15 text-warning border border-warning/20',
};



function AssignedToCell(props: { data: Locker }) {
  if (props.data?.assignedTo === '—') return <span className="text-text-secondary italic">Unassigned</span>;
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-text-primary text-sm">{props.data?.assignedTo}</p>
      <p className="text-xs text-text-secondary mt-0.5">{props.data?.studentId}</p>
    </div>
  );
}

export function ManagerSeatsLockersClient() {
const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '' as string);

  const [lockers, setLockers] = useState<Locker[]>(INITIAL_LOCKERS);
  const [statusFilter, setStatusFilter] = useUrlState('statusFilter', 'All Statuses' as string);
  const [showAssign, setShowAssign] = useState<Locker | null>(null);
  const [assignSearch, setAssignSearch] = useUrlState('assignSearch', '' as string);
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
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Lockers</h1>
            <p className="text-text-secondary mt-1 text-sm">Manage locker assignments and availability</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={() => { setNewnumber(''); setAddError(''); setShowAddModal(true); }}>
            <Plus size={16} />Add Locker
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-1 rounded-xl bg-bg-elevated inline-flex w-fit">
          <div className="w-full md:w-64 relative">
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
          <div className="flex flex-col items-center justify-center p-16 bg-card rounded-xl border border-dashed border-border text-center space-y-4 max-w-2xl mx-auto mt-12">
            <Lock size={48} className="mx-auto text-text-secondary opacity-50" />
            <p className="text-lg font-semibold text-text-primary">No lockers added yet.</p>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={() => { setNewnumber(''); setAddError(''); setShowAddModal(true); }}>
              <Plus size={15} />Add Locker
            </button>
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
                  <th className="px-4 py-3 font-semibold">LOCKER #</th>
                  <th className="px-4 py-3 font-semibold">STATUS</th>
                  <th className="px-4 py-3 font-semibold">ASSIGNED TO</th>
                  <th className="px-4 py-3 font-semibold">SINCE</th>
                  <th className="px-4 py-3 font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {table.paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-page transition-colors">
                    <td className="px-4 py-4"><span className="font-mono font-bold text-text-primary bg-bg-elevated px-2 py-1 rounded border border-border text-sm">{row.number}</span></td>
                    <td className="px-4 py-4"><span className="text-text-primary font-semibold">{row.status}</span></td>
                    <td className="px-4 py-4"><AssignedToCell data={row} /></td>
                    <td className="px-4 py-4 text-text-secondary">{row.assignedSince}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex gap-2 items-center justify-end">
                        {row.status === 'Free' && (
                          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors flex-shrink-0" title="Assign Student" onClick={() => setShowAssign(row)}>
                            <UserPlus size={13} />
                          </button>
                        )}
                        {row.status === 'Occupied' && (
                          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors flex-shrink-0" title="Free Locker" onClick={() => setFreeTarget(row)}>
                            <Unlock size={13} />
                          </button>
                        )}
                        {row.status !== 'Maintenance' && (
                          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors flex-shrink-0" title="Mark Maintenance" onClick={() => handleMarkMaintenance(row)}>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-text-primary p-6 pb-0">➕ Add Locker</h2>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary flex justify-between">Locker ID <span className="text-danger">*</span></label>
              <input
                className={`w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3${addError ? ' border-danger focus:ring-danger/50 bg-danger/5' : ''}`}
                placeholder="e.g. D01"
                value={newnumber}
                onChange={e => { setNewnumber(e.target.value); setAddError(''); }}
              />
              {addError && <p className="text-xs text-danger mt-1 font-medium">{addError}</p>}
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={handleAddLocker}><Plus size={14} />Add</button>
            </div>
          </div>
        </div>
      )}

      {showAssign && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAssign(null)}>
          <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-text-primary p-6 pb-0"><User size={20} className="inline mr-2" /> Assign Locker {showAssign.number}</h2>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary flex justify-between">Student <span className="text-danger">*</span></label>
              <div className="relative w-full max-w-md">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Search by name or Smart ID..." value={assignSearch} onChange={e => setAssignSearch(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => setShowAssign(null)}>Cancel</button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={handleAssign} disabled={!assignSearch.trim()}>
                <UserPlus size={14} />Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {freeTarget && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setFreeTarget(null)}>
          <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-text-primary p-6 pb-0"><Unlock size={20} className="inline mr-2" /> Free Locker {freeTarget.number}</h2>
            <p className="text-text-secondary p-6 pt-2 pb-0 text-sm leading-relaxed">
              Free Locker <strong>{freeTarget.number}</strong> from <strong>{freeTarget.assignedTo}</strong>? Locker becomes available immediately.
            </p>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => setFreeTarget(null)}>Cancel</button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-colors font-medium text-sm" onClick={handleFreeLocker}>Free Locker</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

