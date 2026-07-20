'use client';
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';

// RESPONSIBILITY: Renders the ManagerSeatsSeatManagementClient.tsx component UI.
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student, SeatStatus } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { useState, useMemo } from 'react';
import { Edit, AlertTriangle, Wrench, Plus, Search, CheckCircle, ChevronDown, Armchair } from 'lucide-react';
import toast from 'react-hot-toast';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const STATUS_CLASS: Record<string, string> = {
  Working: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-success/15 text-success border border-success/20',
  Maintenance: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-warning/15 text-warning border border-warning/20',
  Broken: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-danger/15 text-danger border border-danger/20',
};

const EMPTY_FORM = { seatNo: '', branch: '', status: 'Working' as SeatStatus };

function SeatNoCell(props: { value: string }) {
  return <span className="font-mono font-bold text-text-primary bg-bg-elevated px-2 py-1 rounded border border-border text-sm">{props.value}</span>;
}

function BranchCell(props: { data: Seat }) {
  return <span className="font-medium text-text-primary">{props.data?.branch}</span>;
}

function SeatStatusCell(props: { value: string }) {
  return (
    <span className={STATUS_CLASS[props.value as SeatStatus] ?? 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-border/50 text-text-secondary border border-border'}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />{props.value}
    </span>
  );
}

export function ManagerSeatsSeatManagementClient() {
const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '' as string);

  const [seats, setSeats] = useState<Seat[]>(INITIAL_SEATS);
  const [search, setSearch] = useUrlState('search', '' as string);
  const [statusFilter, setStatusFilter] = useUrlState('statusFilter', 'All Statuses' as string);
  const [showModal, setShowModal] = useState(false);
  const [editSeat, setEditSeat] = useState<Seat | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmBroken, setConfirmBroken] = useState<Seat | null>(null);

  const filtered = seats.filter((s: Seat) => {
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
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Seats</h1>
            <p className="text-text-secondary mt-1 text-sm">Manage all library seats</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={openAdd}>
            <Plus size={16} />Add Seat
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-1 rounded-xl bg-bg-elevated inline-flex w-fit">
          <div className="relative w-full max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input type="text" placeholder="Search by seat #, branch or student..." className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="w-full md:w-64 relative">
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
          <div className="flex flex-col items-center justify-center p-16 bg-card rounded-xl border border-dashed border-border text-center space-y-4 max-w-2xl mx-auto mt-12">
            <Armchair size={48} className="mx-auto text-text-secondary opacity-50" />
            <p className="text-lg font-semibold text-text-primary">No seats found.</p>
            <p className="text-text-secondary text-sm">Add your first seat to get started.</p>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={openAdd}><Plus size={15} />Add Seat</button>
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
                      <td className="px-4 py-4"><SeatNoCell value={row.seatNo || ''} /></td>
                      <td className="px-4 py-4"><BranchCell data={row} /></td>
                      <td className="px-4 py-4"><SeatStatusCell value={row.status} /></td>
                      <td className="px-4 py-4 text-text-secondary">{row.assignedTo}</td>
                      <td className="px-4 py-4 text-text-secondary">{row.lastMaintenance}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex gap-2 items-center justify-end">
                          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors flex-shrink-0" title="View Maintenance Log" onClick={() => toast.success(`Opening log for ${row.seatNo}`)}>
                            <Wrench size={13} />
                          </button>
                          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors flex-shrink-0" title="Edit" onClick={() => openEdit(row)}>
                            <Edit size={13} />
                          </button>
                          {row.status !== 'Broken' ? (
                            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors flex-shrink-0" title="Mark Broken" onClick={() => setConfirmBroken(row)}>
                              <AlertTriangle size={13} />
                            </button>
                          ) : (
                            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors flex-shrink-0" title="Mark Fixed" onClick={() => handleMarkFixed(row)}>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-text-primary p-6 pb-0">{editSeat ? 'âœï¸ Edit Seat' : '➕ Add Seat'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary flex justify-between">Seat Number <span className="text-danger">*</span></label>
                <input className={`w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3${errors.seatNo ? ' border-danger focus:ring-danger/50 bg-danger/5' : ''}`} placeholder="e.g. A-01" value={form.seatNo} onChange={e => setForm(p => ({ ...p, seatNo: e.target.value }))} />
                {errors.seatNo && <p className="text-xs text-danger mt-1 font-medium">{errors.seatNo}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary flex justify-between">Branch <span className="text-danger">*</span></label>
                <input className={`w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3${errors.branch ? ' border-danger focus:ring-danger/50 bg-danger/5' : ''}`} placeholder="e.g. North Wing" value={form.branch} onChange={e => setForm(p => ({ ...p, branch: e.target.value }))} />
                {errors.branch && <p className="text-xs text-danger mt-1 font-medium">{errors.branch}</p>}
              </div>
              <div className="flex flex-col gap-1.5 col-span-full">
                <label className="text-sm font-medium text-text-secondary flex justify-between">Status</label>
                <div className="relative w-full">
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
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {confirmBroken && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setConfirmBroken(null)}>
          <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-text-primary p-6 pb-0">⚠️ Mark Seat as Broken</h2>
            <p className="text-text-secondary p-6 pt-2 pb-0 text-sm leading-relaxed">Mark Seat <strong>{confirmBroken.seatNo}</strong> as broken? It will be unavailable for assignment.</p>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => setConfirmBroken(null)}>Cancel</button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-colors font-medium text-sm" onClick={confirmMarkBroken}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

