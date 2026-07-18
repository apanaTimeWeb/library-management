'use client';
// RESPONSIBILITY: Renders the MaintenanceClient component.
import { useState, useMemo } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_shared_components/superadmin_gridTheme';
import toast from 'react-hot-toast';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import type { SuperadminSeatsLogEntry, SuperadminSeatsSeatStatus } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsShiftsLockersTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

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

function StatusBadge({ value }: { value: string }) {
  return <span className={STATUS_CLASS[value as SuperadminSeatsSeatStatus] ?? 'ss-badge ss-badge--inactive'}>{value}</span>;
}

export function MaintenanceClient() {
  const [selectedSeat, setSelectedSeat] = useState('S-006');
  const [logs, setLogs] = useState(SEAT_LOGS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentLogs = logs[selectedSeat] ?? [];
  const daysSince = DAYS_SINCE[selectedSeat] ?? 0;
  const showOverdue = daysSince > 30;
  const currentStatus = CURRENT_STATUS[selectedSeat];

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

  const colDefs = useMemo<any[]>(() => [
    { field: 'num', headerName: '#', flex: 0.5, cellClass: 'ss-cell-secondary' },
    { field: 'date', headerName: 'DATE', flex: 1.2, cellClass: 'ss-cell-secondary' },
    { field: 'remark', headerName: 'REMARK', flex: 2.5, cellClass: 'ss-cell-primary' },
    { field: 'doneBy', headerName: 'DONE BY', flex: 1.2, cellClass: 'ss-cell-secondary' },
    { field: 'statusBefore', headerName: 'STATUS BEFORE', flex: 1.3, cellRenderer: StatusBadge },
    { field: 'statusAfter', headerName: 'STATUS AFTER', flex: 1.3, cellRenderer: StatusBadge },
    { field: 'cost', headerName: 'COST', flex: 0.8, cellClass: 'ss-cell-secondary' },
  ], []);

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
          <div className="ss-table-wrapper ss-grid-h-320">
            <AgGridReact theme={superadmin_gridTheme} rowData={currentLogs} columnDefs={colDefs as any} rowHeight={52} headerHeight={40} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false, sortable: true }} />
          </div>
        )}

        <div className="ss-card ss-form-card">
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
