'use client';
// RESPONSIBILITY: Renders the SuperadminMaintenanceClient component.
import { useState, useMemo } from 'react';
import { AlertTriangle, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import type { SuperadminSeatsLogEntry, SuperadminSeatsSeatStatus } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsShiftsLockersTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const SEAT_LOGS: Record<string, SuperadminSeatsLogEntry[]> = {
  'S-006': [
    { id: '1', num: 1, date: '10 Oct 2024', remark: 'Chair leg repaired', doneBy: 'Ramesh K.', statusBefore: 'Broken', statusAfter: 'Working', cost: '₹350' },
    { id: '2', num: 2, date: '15 Aug 2024', remark: 'Routine inspection', doneBy: 'Suresh M.', statusBefore: 'Working', statusAfter: 'Working', cost: '—' },
  ],
  'S-017': [
    { id: '3', num: 1, date: '15 Oct 2024', remark: 'Loose table joint — WIP', doneBy: 'Suresh M.', statusBefore: 'Working', statusAfter: 'Maintenance', cost: '—' },
  ],
  'S-029': [],
  'S-043': [
    { id: '4', num: 1, date: '05 Oct 2024', remark: 'Power socket replaced', doneBy: 'Ramesh K.', statusBefore: 'Broken', statusAfter: 'Working', cost: '₹200' },
    { id: '5', num: 2, date: '20 Jul 2024', remark: 'Socket loose — tightened', doneBy: 'Ramesh K.', statusBefore: 'Maintenance', statusAfter: 'Working', cost: '₹50' },
  ],
};

const SEATS = Object.keys(SEAT_LOGS);

const DAYS_SINCE: Record<string, number> = { 'S-006': 14, 'S-017': 9, 'S-029': 62, 'S-043': 19 };

const STATUS_CLASS: Record<SuperadminSeatsSeatStatus, string> = {
  Working: 'ss-badge ss-badge--success',
  Maintenance: 'ss-badge ss-badge--warning',
  Broken: 'ss-badge ss-badge--danger',
};

const CURRENT_STATUS: Record<string, SuperadminSeatsSeatStatus> = {
  'S-006': 'Working', 'S-017': 'Maintenance', 'S-029': 'Broken', 'S-043': 'Working',
};

const EMPTY_FORM = { date: '', remark: '', doneBy: '', newStatus: 'Working' as SuperadminSeatsSeatStatus, cost: '' };

export function SuperadminMaintenanceClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('S-006');
  const [logs, setLogs] = useState(SEAT_LOGS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const currentLogs = logs[selectedSeat] ?? [];
  const daysSince = DAYS_SINCE[selectedSeat] ?? 0;
  const showOverdue = daysSince > 30;
  const currentStatus = CURRENT_STATUS[selectedSeat];

  const searchedLogs = useMemo(() => {
    if (!searchTerm) return currentLogs;
    const lowerSearch = searchTerm.toLowerCase();
    return currentLogs.filter(log => 
      log.remark?.toLowerCase().includes(lowerSearch) ||
      log.doneBy?.toLowerCase().includes(lowerSearch)
    );
  }, [currentLogs, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSeat]);

  const totalPages = Math.ceil(searchedLogs.length / pageSize);
  const paginatedLogs = searchedLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.date) e.date = 'Date is required';
    if (!form.remark.trim()) e.remark = 'Remark is required';
    if (!form.newStatus) e.newStatus = 'Status is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleAddEntry() {
    if (!validate()) return;
    const prevStatus = currentLogs.length > 0 ? currentLogs[currentLogs.length - 1].statusAfter : currentStatus;
    const newEntry: SuperadminSeatsLogEntry = {
      id: Date.now().toString(),
      num: currentLogs.length + 1,
      date: form.date,
      remark: form.remark,
      doneBy: form.doneBy || '—',
      statusBefore: prevStatus,
      statusAfter: form.newStatus,
      cost: form.cost ? `₹${form.cost}` : '—',
    };
    setLogs(prev => ({ ...prev, [selectedSeat]: [...(prev[selectedSeat] ?? []), newEntry] }));
    setForm(EMPTY_FORM);
    toast.success('Maintenance entry added.');
  }

  return (
    <>
      <div className="ss-page">
        <div className="ss-page-header">
          <div>
            <h1 className="ss-page-title">Seat Maintenance Log</h1>
            <p className="ss-page-subtitle">Track all seat repair and maintenance activity</p>
          </div>
        </div>

        <div className="ss-filter-bar">
          <div style={{ minWidth: 200 }}>
            <SuperadminSearchableDropdown
              options={SEATS.map(s => ({ label: s, value: s }))}
              value={selectedSeat}
              onChange={setSelectedSeat}
            />
          </div>
          <span className={STATUS_CLASS[currentStatus]}>{currentStatus}</span>
        </div>

        {showOverdue && (
          <div className="ss-alert-banner">
            <AlertTriangle size={16} className="ss-text-warning" />
            <span>Last maintenance was <strong>{daysSince} days ago</strong> — attention recommended.</span>
          </div>
        )}

        {currentLogs.length === 0 ? (
          <div className="ss-empty-state">
            <p className="ss-empty-state__icon">🔧</p>
            <p className="ss-empty-state__title">No maintenance history for this seat.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full bg-bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 flex flex-col gap-4">
              <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
              
              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader className="bg-bg-page/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">#</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">DATE</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">REMARK</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">DONE BY</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">STATUS BEFORE</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">STATUS AFTER</TableHead>
                      <TableHead className="text-xs font-semibold text-text-secondary uppercase">COST</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedLogs.length > 0 ? (
                      paginatedLogs.map((log, index) => (
                        <TableRow 
                          key={index}
                          className="hover:bg-bg-page/50 transition-colors"
                        >
                          <TableCell className="ss-cell-secondary">
                            {log.num}
                          </TableCell>
                          <TableCell className="ss-cell-secondary">
                            {log.date}
                          </TableCell>
                          <TableCell className="ss-cell-primary">
                            {log.remark}
                          </TableCell>
                          <TableCell className="ss-cell-secondary">
                            {log.doneBy}
                          </TableCell>
                          <TableCell>
                            <span className={STATUS_CLASS[log.statusBefore as SuperadminSeatsSeatStatus] ?? 'ss-badge ss-badge--inactive'}>{log.statusBefore}</span>
                          </TableCell>
                          <TableCell>
                            <span className={STATUS_CLASS[log.statusAfter as SuperadminSeatsSeatStatus] ?? 'ss-badge ss-badge--inactive'}>{log.statusAfter}</span>
                          </TableCell>
                          <TableCell className="ss-cell-secondary">
                            {log.cost}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center text-text-secondary">
                          No maintenance logs match your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-bg-page/30">
              <span className="text-sm font-semibold text-text-secondary">
                Showing {paginatedLogs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedLogs.length)} of {searchedLogs.length} logs
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

        <div className="ss-card ss-form-card mt-6">
          <h3 className="ss-section-heading ss-form-card__title">Add New Entry</h3>
          <div className="ss-form-grid">
            <div className="ss-form-field">
              <label className="ss-label">Date <span className="ss-text-danger">*</span></label>
              <input type="date" className={`ss-input ss-input--no-icon${errors.date ? ' ss-input--error' : ''}`} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
              {errors.date && <p className="ss-error">{errors.date}</p>}
            </div>
            <div className="ss-form-field">
              <label className="ss-label">Done By</label>
              <input className="ss-input ss-input--no-icon" placeholder="Technician name" value={form.doneBy} onChange={e => setForm(p => ({ ...p, doneBy: e.target.value }))} />
            </div>
            <div className="ss-form-field">
              <label className="ss-label">New Seat Status <span className="ss-text-danger">*</span></label>
              <SuperadminSearchableDropdown
                options={[
                  { label: 'Working', value: 'Working' },
                  { label: 'Maintenance', value: 'Maintenance' },
                  { label: 'Broken', value: 'Broken' }
                ]}
                value={form.newStatus}
                onChange={val => setForm(p => ({ ...p, newStatus: val as SuperadminSeatsSeatStatus }))}
              />
            </div>
            <div className="ss-form-field">
              <label className="ss-label">Cost (₹)</label>
              <input type="number" className="ss-input ss-input--no-icon" placeholder="e.g. 350" value={form.cost} onChange={e => setForm(p => ({ ...p, cost: e.target.value }))} />
            </div>
            <div className="ss-form-field ss-form-field--full">
              <label className="ss-label">Remark <span className="ss-text-danger">*</span></label>
              <textarea className={`ss-textarea${errors.remark ? ' ss-input--error' : ''}`} rows={2} placeholder="e.g. Chair leg repaired" value={form.remark} onChange={e => setForm(p => ({ ...p, remark: e.target.value }))} />
              {errors.remark && <p className="ss-error">{errors.remark}</p>}
            </div>
          </div>
          <div className="ss-form-footer">
            <button className="ss-btn-primary" onClick={handleAddEntry}>
              <Plus size={15} />Add Log Entry
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
