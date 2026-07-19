'use client';
// RESPONSIBILITY: Renders the SuperadminSeatManagementClient component.
import { useState, useMemo } from 'react';
import { Plus, Search, Wrench, Edit, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { SUPERADMIN_SEATS_MOCK_SEATS } from '@superadmin/superadmin_seats_shifts_lockers/superadmin_seats_shifts_lockers_utils/SuperadminSeatsMockData';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import type { SuperadminSeatsSeat, SuperadminSeatsSeatStatus } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsShiftsLockersTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const STATUS_CLASS: Record<SuperadminSeatsSeatStatus, string> = {
  Working: 'ss-badge ss-badge--success',
  Maintenance: 'ss-badge ss-badge--warning',
  Broken: 'ss-badge ss-badge--danger',
};

const EMPTY_FORM = { seatNo: '', branch: '', status: 'Working' as SuperadminSeatsSeatStatus };

export function SuperadminSeatManagementClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [seats, setSeats] = useState<SuperadminSeatsSeat[]>(SUPERADMIN_SEATS_MOCK_SEATS as SuperadminSeatsSeat[]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [showModal, setShowModal] = useState(false);
  const [editSeat, setEditSeat] = useState<SuperadminSeatsSeat | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmBroken, setConfirmBroken] = useState<SuperadminSeatsSeat | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return seats.filter(s => {
      const matchSearch = s.seatNo.toLowerCase().includes(search.toLowerCase()) ||
        s.branch.toLowerCase().includes(search.toLowerCase()) ||
        s.assignedTo.toLowerCase().includes(search.toLowerCase());
      
      const termMatch = !searchTerm || 
        s.seatNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All Statuses' || s.status === statusFilter;
      return matchSearch && termMatch && matchStatus;
    });
  }, [seats, search, searchTerm, statusFilter]);

  useMemo(() => {
    setCurrentPage(1);
  }, [search, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedSeats = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function openAdd() {
    setEditSeat(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowModal(true);
  }

  function openEdit(seat: SuperadminSeatsSeat) {
    setEditSeat(seat);
    setForm({ seatNo: seat.seatNo, branch: seat.branch, status: seat.status });
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
      setSeats(prev => prev.map(( s ) => s.id === editSeat.id ? { ...s, ...form } : s));
      toast.success('Seat updated.');
    } else {
      setSeats(prev => [...prev, { id: Date.now().toString(), ...form, assignedTo: '—', lastMaintenance: '—' }]);
      toast.success('Seat added.');
    }
    setShowModal(false);
  }

  function handleMarkFixed(seat: SuperadminSeatsSeat) {
    setSeats(prev => prev.map(( s ) => s.id === seat.id ? { ...s, status: 'Working' } : s));
    toast.success(`Seat ${seat.seatNo} marked as Working.`);
  }

  function confirmMarkBroken() {
    if (!confirmBroken) return;
    setSeats(prev => prev.map(( s ) => s.id === confirmBroken.id ? { ...s, status: 'Broken' } : s));
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
          <div className="min-w-48">
            <SuperadminSearchableDropdown
              options={[
                { label: 'All Statuses', value: 'All Statuses' },
                { label: 'Working', value: 'Working' },
                { label: 'Maintenance', value: 'Maintenance' },
                { label: 'Broken', value: 'Broken' }
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="ss-empty-state">
            <p className="ss-empty-state__icon">🪑</p>
            <p className="ss-empty-state__title">No seats found.</p>
            <p className="ss-empty-state__sub">Add your first seat to get started.</p>
            <button className="ss-btn-primary" onClick={openAdd}><Plus size={15} />Add Seat</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full bg-bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 flex flex-col gap-4">
              <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
              
              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader className="bg-page/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">SEAT #</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">BRANCH</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">STATUS</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">ASSIGNED TO</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">LAST MAINTENANCE</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase w-36">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedSeats.length > 0 ? (
                      paginatedSeats.map((seat, index) => (
                        <TableRow 
                          key={index}
                          className="hover:bg-page/50 transition-colors"
                        >
                          <TableCell>
                            <span className="ss-table__seat-no">{seat.seatNo}</span>
                          </TableCell>
                          <TableCell>
                            <span className="ss-cell-primary">{seat.branch}</span>
                          </TableCell>
                          <TableCell>
                            <span className={STATUS_CLASS[seat.status as SuperadminSeatsSeatStatus] ?? 'ss-badge ss-badge--inactive'}>
                              <span className="ss-badge__dot" />{seat.status}
                            </span>
                          </TableCell>
                          <TableCell className="ss-cell-secondary">
                            {seat.assignedTo}
                          </TableCell>
                          <TableCell className="ss-cell-secondary">
                            {seat.lastMaintenance}
                          </TableCell>
                          <TableCell>
                            <div className="ss-cell-actions">
                              <button className="ss-btn-icon" title="View Maintenance Log" onClick={() => toast.success(`Opening log for ${seat.seatNo}`)}>
                                <Wrench size={13} />
                              </button>
                              <button className="ss-btn-icon" title="Edit" onClick={() => openEdit(seat)}>
                                <Edit size={13} />
                              </button>
                              {seat.status !== 'Broken' ? (
                                <button className="ss-btn-icon" title="Mark Broken" onClick={() => setConfirmBroken(seat)}>
                                  <AlertTriangle size={13} />
                                </button>
                              ) : (
                                <button className="ss-btn-icon" title="Mark Fixed" onClick={() => handleMarkFixed(seat)}>
                                  <CheckCircle size={13} />
                                </button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-text-secondary">
                          No seats match your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-page/30">
              <span className="text-sm font-semibold text-text-secondary">
                Showing {paginatedSeats.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} seats
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-text-primary">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="ss-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            <h2 className="ss-modal-title">{editSeat ? '✏️ Edit Seat' : '➕ Add Seat'}</h2>
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
                <SuperadminSearchableDropdown
                  options={[
                    { label: 'Working', value: 'Working' },
                    { label: 'Maintenance', value: 'Maintenance' },
                    { label: 'Broken', value: 'Broken' }
                  ]}
                  value={form.status}
                  onChange={val => setForm(p => ({ ...p, status: val as SuperadminSeatsSeatStatus }))}
                />
              </div>
            </div>
            <div className="ss-modal-footer">
              <button className="ss-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="ss-btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Mark Broken Confirm */}
      {confirmBroken && (
        <div className="ss-modal-overlay" onClick={() => setConfirmBroken(null)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            <h2 className="ss-modal-title">⚠️ Mark Seat as Broken</h2>
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

