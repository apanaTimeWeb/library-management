import { useUrlState } from '@/app/admin/admin_shared_hooks/useUrlState';
// RESPONSIBILITY: Renders the useAdminSeatManagement.ts component/hook.
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export interface Seat {
  id: string;
  seatNo: string;
  branch: string;
  status: SeatStatus;
  assignedTo: string;
  lastMaintenance: string;
}

export const seatSchema = z.object({
  seatNo: z.string().min(1, 'Seat number is required'),
  branch: z.string().min(1, 'Branch is required'),
  status: z.enum(['Working', 'Maintenance', 'Broken'])
});
export type SeatFormValues = z.infer<typeof seatSchema>;
export type SeatStatus = SeatFormValues['status'];

const EMPTY_FORM: SeatFormValues = { seatNo: '', branch: '', status: 'Working' };

export function useAdminSeatManagement(initialSeats: Seat[]) {
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [search, setSearch] = useUrlState('search', '');
  const [statusFilter, setStatusFilter] = useUrlState('statusFilter', 'All Statuses');
  
  const [showModal, setShowModal] = useState(false);
  const [editSeat, setEditSeat] = useState<Seat | null>(null);
  const [confirmBroken, setConfirmBroken] = useState<Seat | null>(null);

  const form = useForm<SeatFormValues>({
    resolver: zodResolver(seatSchema),
    defaultValues: EMPTY_FORM
  });

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
    form.reset(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(seat: Seat) {
    setEditSeat(seat);
    form.reset({ seatNo: seat.seatNo, branch: seat.branch, status: seat.status });
    setShowModal(true);
  }

  const handleSave = form.handleSubmit((data) => {
    if (editSeat) {
      setSeats(prev => prev.map(s => s.id === editSeat.id ? { ...s, ...data } : s));
      toast.success('Seat updated.');
    } else {
      setSeats(prev => [...prev, { id: Date.now().toString(), ...data, assignedTo: '—', lastMaintenance: '—' }]);
      toast.success('Seat added.');
    }
    setShowModal(false);
  });

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
    confirmBroken,
    setConfirmBroken,
    openAdd,
    openEdit,
    handleSave,
    handleMarkFixed,
    confirmMarkBroken
  };
}
