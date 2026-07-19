'use client';
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';

// RESPONSIBILITY: Renders the ManagerSeatsSeatMaintenanceClient.tsx component UI.
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student, SeatStatus } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { useState, useMemo } from 'react';
import { AlertTriangle, Plus, ChevronDown, Wrench } from 'lucide-react';
import toast from 'react-hot-toast';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const SEAT_LOGS: Record<string, LogEntry[]> = {
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

// Days since last log (hardcoded for demo)
const DAYS_SINCE: Record<string, number> = { 'S-006': 14, 'S-017': 9, 'S-029': 62, 'S-043': 19 };

const STATUS_CLASS: Record<string, string> = {
  Working: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-success/15 text-success border border-success/20',
  Maintenance: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-warning/15 text-warning border border-warning/20',
  Broken: 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-danger/15 text-danger border border-danger/20',
};

const CURRENT_STATUS: Record<string, SeatStatus> = {
  'S-006': 'Working', 'S-017': 'Maintenance', 'S-029': 'Broken', 'S-043': 'Working',
};

const EMPTY_FORM = { date: '', remark: '', doneBy: '', newStatus: 'Working' as SeatStatus, cost: '' };

function StatusBadge(props: { value: string }) {
  return <span className={STATUS_CLASS[props.value as SeatStatus] ?? 'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-border/50 text-text-secondary border border-border'}>{props.value}</span>;
}

export function ManagerSeatsSeatMaintenanceClient() {
const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '' as string);

  const [selectedSeat, setSelectedSeat] = useState('S-006');
  const [logs, setLogs] = useState(SEAT_LOGS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredLogs = (logs[selectedSeat] ?? []).filter(log => 
    !searchTerm || 
    (log.remark || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (log.doneBy || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  const table = useClientTable(filteredLogs, 10);


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
    const newEntry: LogEntry = {
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
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Seat Maintenance Log</h1>
            <p className="text-text-secondary mt-1 text-sm">Track all seat repair and maintenance activity</p>
          </div>
        </div>

        {/* Seat selector + status */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-1 rounded-xl bg-bg-elevated inline-flex w-fit">
          <div className="w-full md:w-64 relative">
            <ManagerSearchableDropdown
              value={selectedSeat}
              onChange={setSelectedSeat}
              options={SEATS.map(s => ({ label: s, value: s }))}
            />
          </div>
          <span className={STATUS_CLASS[currentStatus]}>{currentStatus}</span>
        </div>

        {/* Overdue alert */}
        {showOverdue && (
          <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 text-warning rounded-lg text-sm font-medium">
            <AlertTriangle size={16} className="text-warning" />
            <span>Last maintenance was <strong>{daysSince} days ago</strong> — attention recommended.</span>
          </div>
        )}

        {/* History table */}
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 bg-card rounded-xl border border-dashed border-border text-center space-y-4 max-w-2xl mx-auto mt-12">
            <Wrench size={48} className="mx-auto text-text-secondary opacity-50" />
            <p className="text-lg font-semibold text-text-primary">No maintenance history for this seat.</p>
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
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">DATE</th>
                    <th className="px-4 py-3 font-semibold">REMARK</th>
                    <th className="px-4 py-3 font-semibold">DONE BY</th>
                    <th className="px-4 py-3 font-semibold">STATUS BEFORE</th>
                    <th className="px-4 py-3 font-semibold">STATUS AFTER</th>
                    <th className="px-4 py-3 font-semibold">COST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {table.paginatedData.map((row) => (
                    <tr key={row.id} className="hover:bg-page transition-colors">
                      <td className="px-4 py-4 text-text-secondary">{row.num}</td>
                      <td className="px-4 py-4 text-text-secondary">{row.date}</td>
                      <td className="px-4 py-4 font-semibold text-text-primary">{row.remark}</td>
                      <td className="px-4 py-4 text-text-secondary">{row.doneBy}</td>
                      <td className="px-4 py-4"><StatusBadge value={row.statusBefore || ''} /></td>
                      <td className="px-4 py-4"><StatusBadge value={row.statusAfter || ''} /></td>
                      <td className="px-4 py-4 text-text-secondary">{row.cost}</td>
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

        {/* Add New Entry form */}
        <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-text-primary text-lg font-semibold text-text-primary mb-4">Add New Entry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary flex justify-between">Date <span className="text-danger">*</span></label>
              <input type="date" className={`w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3${errors.date ? ' border-danger focus:ring-danger/50 bg-danger/5' : ''}`} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
              {errors.date && <p className="text-xs text-danger mt-1 font-medium">{errors.date}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary flex justify-between">Done By</label>
              <input className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3" placeholder="Technician name" value={form.doneBy} onChange={e => setForm(p => ({ ...p, doneBy: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary flex justify-between">New Seat Status <span className="text-danger">*</span></label>
              <div className="relative w-full">
                <ManagerSearchableDropdown
                  value={form.newStatus}
                  onChange={v => setForm(p => ({ ...p, newStatus: v as SeatStatus }))}
                  options={[
                    { label: 'Working', value: 'Working' },
                    { label: 'Maintenance', value: 'Maintenance' },
                    { label: 'Broken', value: 'Broken' }
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary flex justify-between">Cost (₹)</label>
              <input type="number" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3" placeholder="e.g. 350" value={form.cost} onChange={e => setForm(p => ({ ...p, cost: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5 col-span-full">
              <label className="text-sm font-medium text-text-secondary flex justify-between">Remark <span className="text-danger">*</span></label>
              <textarea className={`w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-y${errors.remark ? ' border-danger focus:ring-danger/50 bg-danger/5' : ''}`} rows={2} placeholder="e.g. Chair leg repaired" value={form.remark} onChange={e => setForm(p => ({ ...p, remark: e.target.value }))} />
              {errors.remark && <p className="text-xs text-danger mt-1 font-medium">{errors.remark}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={handleAddEntry}>
              <Plus size={15} />Add Log Entry
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

