// RESPONSIBILITY: Renders the useAdminSeatManagement.ts component/hook.
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';


export interface Seat {
  id: string;
  seatNo: string;
  branch: string;
  status: SeatStatus;
  assignedTo: string;
  lastMaintenance: string;
}
export type SeatStatus = 'Working' | 'Maintenance' | 'Broken';

const EMPTY_FORM = { seatNo: '', branch: '', status: 'Working' as SeatStatus };

export function useAdminSeatManagement(initialSeats: Seat[]) {
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  
  const [showModal, setShowModal] = useState(false);
  const [editSeat, setEditSeat] = useState<Seat | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [confirmBroken, setConfirmBroken] = useState<Seat | null>(null);

  const filtered = useMemo(() => {
    return seats.filter(s => {
      const matchSearch = s.seatNo.toLowerCase().includes(search.toLowerCase()) ||
        s.branch.toLowerCase().includes(search.toLowerCase()) ||
        s.assignedTo.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All Statuses' || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [seats, search, statusFilter]);

  function openAdd() {
    setEditSeat(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowModal(true);
  }

  function openEdit(seat: Seat) {
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
      setSeats(prev => prev.map(s => s.id === editSeat.id ? { ...s, ...form } : s));
      toast.success('Seat updated.');
    } else {
      setSeats(prev => [...prev, { id: Date.now().toString(), ...form, assignedTo: '—', lastMaintenance: '—' }]);
      toast.success('Seat added.');
    }
    setShowModal(false);
  }

  function handleMarkFixed(seat: Seat) {
    setSeats(prev => prev.map(s => s.id === seat.id ? { ...s, status: 'Working' } : s));
    toast.success(`Seat ${seat.seatNo} marked as Working.`);
  }

  function confirmMarkBroken() {
    if (!confirmBroken) return;
    setSeats(prev => prev.map(s => s.id === confirmBroken.id ? { ...s, status: 'Broken' } : s));
    toast.success(`Seat ${confirmBroken.seatNo} marked as Broken.`);
    setConfirmBroken(null);
  }

  return {
    seats,
    filtered,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    showModal,
    setShowModal,
    editSeat,
    form,
    setForm,
    errors,
    confirmBroken,
    setConfirmBroken,
    openAdd,
    openEdit,
    handleSave,
    handleMarkFixed,
    confirmMarkBroken
  };
}
