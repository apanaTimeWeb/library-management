import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';

export type SeatStatus = 'Working' | 'Maintenance' | 'Broken';

export interface LogEntry {
  id: string;
  num: number;
  date: string;
  remark: string;
  doneBy: string;
  statusBefore: SeatStatus;
  statusAfter: SeatStatus;
  cost: string;
}

export const SEAT_LOGS: Record<string, LogEntry[]> = {
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

export const SEATS = Object.keys(SEAT_LOGS);

// Days since last log (hardcoded for demo)
export const DAYS_SINCE: Record<string, number> = { 'S-006': 14, 'S-017': 9, 'S-029': 62, 'S-043': 19 };

export const CURRENT_STATUS: Record<string, SeatStatus> = {
  'S-006': 'Working', 'S-017': 'Maintenance', 'S-029': 'Broken', 'S-043': 'Working',
};

const EMPTY_FORM = { date: '', remark: '', doneBy: '', newStatus: 'Working' as SeatStatus, cost: '' };

export function useMaintenance() {
  const [selectedSeat, setSelectedSeat] = useState('S-006');
  const [logs, setLogs] = useState(SEAT_LOGS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentLogs = useMemo(() => logs[selectedSeat] ?? [], [logs, selectedSeat]);
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

  return {
    selectedSeat,
    setSelectedSeat,
    logs,
    form,
    setForm,
    errors,
    currentLogs,
    daysSince,
    showOverdue,
    currentStatus,
    handleAddEntry,
    SEATS
  };
}
