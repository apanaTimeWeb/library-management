'use client';
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';

// RESPONSIBILITY: Renders the ManagerSeatsSeatManagementClient.tsx component UI.
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student, SeatStatus } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { useState, useMemo } from 'react';
import { Edit, AlertTriangle, Wrench, Plus, Search, CheckCircle, ChevronDown, Armchair } from 'lucide-react';
import toast from 'react-hot-toast';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const STATUS_CLASS: Record<string, string> = {
  Working: 'ss-badge ss-badge--success',
  Maintenance: 'ss-badge ss-badge--warning',
  Broken: 'ss-badge ss-badge--danger',
};

const EMPTY_FORM = { seatNo: '', branch: '', status: 'Working' as SeatStatus };

function SeatNoCell(props: { value: string }) {
  return <span className="ss-table__seat-no">{props.value}</span>;
}

function BranchCell(props: { data: Seat }) {
  return <span className="ss-cell-primary">{props.data?.branch}</span>;
}

function SeatStatusCell(props: { value: string }) {
  return (
    <span className={STATUS_CLASS[props.value as SeatStatus] ?? 'ss-badge ss-badge--inactive'}>
      <span className="ss-badge__dot" />{props.value}
    </span>
  );
}

export function ManagerSeatsSeatManagementClient() {
const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '' as string);

    // @ts-ignore
  const [seats, setSeats] = useState<Seat[]>(INITIAL_SEATS);
  const [search, setSearch] = useUrlState('search', '' as string);
  const [statusFilter, setStatusFilter] = useUrlState('statusFilter', 'All Statuses' as string);
  const [showModal, setShowModal] = useState(false);
  const [editSeat, setEditSeat] = useState<Seat | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmBroken, setConfirmBroken] = useState<Seat | null>(null);

  const filtered = (seats as any[]).filter((s: Seat) => {
    const matchSearch = (s.seatNo || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.branch || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.assignedTo || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Statuses' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });
  
  const table = useClientTable(filtered, 10);

  function openAdd() {
    setEditSeat(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowModal(true);
  }

  function openEdit(seat: Seat) {
    setEditSeat(seat);
    setForm({ seatNo: seat.seatNo || '', branch: seat.branch || '', status: seat.status as SeatStatus });
    setErrors({});
    setShowModal(true);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.seatNo.trim()) e.seatNo = 'Seat number is required';
    if (!form.branch.trim()) e.branch = 'Branch is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    if (editSeat) {
      setSeats(prev => prev.map((s: Seat) => s.id === editSeat.id ? { ...s, ...form, status: form.status as SeatStatus } : s));
      toast.success('Seat updated.');
    } else {
      setSeats(prev => [...prev, { id: Date.now().toString(), ...form, assignedTo: '—', lastMaintenance: '—', status: form.status as SeatStatus }]);
      toast.success('Seat added.');
    }
    setShowModal(false);
  }

  function handleMarkFixed(seat: Seat) {
    setSeats(prev => prev.map((s: Seat) => s.id === seat.id ? { ...s, status: 'Working' } : s));
    toast.success(`Seat ${seat.seatNo} marked as Working.`);
  }

  function confirmMarkBroken() {
    if (!confirmBroken) return;
    setSeats(prev => prev.map((s: Seat) => s.id === confirmBroken.id ? { ...s, status: 'Broken' } : s));
    toast.success(`Seat ${confirmBroken.seatNo} marked as Broken.`);
    setConfirmBroken(null);
  }


  return (
    <>
      <div className="ss-page">
        <div className="ss-page-header">
          <div>
            <h1 className="ss-page-title">Seats</h1>
            <p className="ss-page-subtitle">Manage all library seats</p>
          </div>
          <button className="ss-btn-primary ss-btn-start" onClick={openAdd}>
            <Plus size={16} />Add Seat
          </button>
        </div>

        <div className="ss-filter-bar">
          <div className="ss-filter-bar__input-wrap">
            <Search size={14} className="ss-input-icon" />
            <input type="text" placeholder="Search by seat #, branch or student..." className="ss-input" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="ss-filter-bar__select-wrap">
            <ManagerSearchableDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: 'All Statuses', value: 'All Statuses' },
                { label: 'Working', value: 'Working' },
                { label: 'Maintenance', value: 'Maintenance' },
                { label: 'Broken', value: 'Broken' }
              ]}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="ss-empty-state">
            <Armchair size={48} className="mx-auto text-text-secondary opacity-50" />
            <p className="ss-empty-state__title">No seats found.</p>
            <p className="ss-empty-state__sub">Add your first seat to get started.</p>
            <button className="ss-btn-primary" onClick={openAdd}><Plus size={15} />Add Seat</button>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto border border-border rounded-xl">
              <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-card border-b border-border">
                  <tr className="text-text-secondary text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 font-semibold">SEAT #</th>
                    <th className="px-4 py-3 font-semibold">BRANCH</th>
                    <th className="px-4 py-3 font-semibold">STATUS</th>
                    <th className="px-4 py-3 font-semibold">ASSIGNED TO</th>
                    <th className="px-4 py-3 font-semibold">LAST MAINTENANCE</th>
                    <th className="px-4 py-3 font-semibold text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {table.paginatedData.map((row) => (
                    <tr key={row.id} className="hover:bg-page transition-colors">
    // @ts-ignore
                      <td className="px-4 py-4"><SeatNoCell value={row.seatNo} /></td>
                      <td className="px-4 py-4"><BranchCell data={row} /></td>
                      <td className="px-4 py-4"><SeatStatusCell value={row.status} /></td>
                      <td className="px-4 py-4 text-text-secondary">{row.assignedTo}</td>
                      <td className="px-4 py-4 text-text-secondary">{row.lastMaintenance}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex gap-2 items-center justify-end">
                          <button className="ss-btn-icon" title="View Maintenance Log" onClick={() => toast.success(`Opening log for ${row.seatNo}`)}>
                            <Wrench size={13} />
                          </button>
                          <button className="ss-btn-icon" title="Edit" onClick={() => openEdit(row)}>
                            <Edit size={13} />
                          </button>
                          {row.status !== 'Broken' ? (
                            <button className="ss-btn-icon" title="Mark Broken" onClick={() => setConfirmBroken(row)}>
                              <AlertTriangle size={13} />
                            </button>
                          ) : (
                            <button className="ss-btn-icon" title="Mark Fixed" onClick={() => handleMarkFixed(row)}>
                              <CheckCircle size={13} />
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

      {showModal && (
        <div className="ss-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            <h2 className="ss-modal-title">{editSeat ? 'âœï¸ Edit Seat' : 'âž• Add Seat'}</h2>
            <div className="ss-form-grid">
              <div className="ss-form-field">
                <label className="ss-label">Seat Number <span className="ss-text-danger">*</span></label>
                <input className={`ss-input ss-input--no-icon${errors.seatNo ? ' ss-input--error' : ''}`} placeholder="e.g. A-01" value={form.seatNo} onChange={e => setForm(p => ({ ...p, seatNo: e.target.value }))} />
                {errors.seatNo && <p className="ss-error">{errors.seatNo}</p>}
              </div>
              <div className="ss-form-field">
                <label className="ss-label">Branch <span className="ss-text-danger">*</span></label>
                <input className={`ss-input ss-input--no-icon${errors.branch ? ' ss-input--error' : ''}`} placeholder="e.g. North Wing" value={form.branch} onChange={e => setForm(p => ({ ...p, branch: e.target.value }))} />
                {errors.branch && <p className="ss-error">{errors.branch}</p>}
              </div>
              <div className="ss-form-field ss-form-field--full">
                <label className="ss-label">Status</label>
                <div className="ss-select-wrap">
                  <ManagerSearchableDropdown
                    value={form.status}
                    onChange={v => setForm(p => ({ ...p, status: v as SeatStatus }))}
                    options={[
                      { label: 'Working', value: 'Working' },
                      { label: 'Maintenance', value: 'Maintenance' },
                      { label: 'Broken', value: 'Broken' }
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="ss-modal-footer">
              <button className="ss-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="ss-btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {confirmBroken && (
        <div className="ss-modal-overlay" onClick={() => setConfirmBroken(null)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            <h2 className="ss-modal-title">⚠️ Mark Seat as Broken</h2>
            <p className="ss-modal-desc">Mark Seat <strong>{confirmBroken.seatNo}</strong> as broken? It will be unavailable for assignment.</p>
            <div className="ss-modal-footer">
              <button className="ss-btn-ghost" onClick={() => setConfirmBroken(null)}>Cancel</button>
              <button className="ss-btn-danger" onClick={confirmMarkBroken}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

