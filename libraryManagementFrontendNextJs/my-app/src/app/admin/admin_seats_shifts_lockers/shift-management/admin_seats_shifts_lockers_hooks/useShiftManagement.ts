import { useState } from 'react';
import toast from 'react-hot-toast';
import { ADMIN_SEATS_MOCK_SHIFTS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_data/AdminSeatsMockData';

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  occupancy: number;
  capacity: number;
  active: boolean;
}

const EMPTY_FORM = { name: '', startTime: '', endTime: '', active: true };

export function useShiftManagement() {
  const [shifts, setShifts] = useState<Shift[]>(ADMIN_SEATS_MOCK_SHIFTS as Shift[]);
  const [showModal, setShowModal] = useState(false);
  const [editShift, setEditShift] = useState<Shift | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deactivateTarget, setDeactivateTarget] = useState<Shift | null>(null);

  function openAdd() {
    setEditShift(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowModal(true);
  }

  function openEdit(shift: Shift) {
    setEditShift(shift);
    setForm({ name: shift.name, startTime: shift.startTime, endTime: shift.endTime, active: shift.active });
    setErrors({});
    setShowModal(true);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Shift name is required';
    if (!form.startTime) e.startTime = 'Start time is required';
    if (!form.endTime) e.endTime = 'End time is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    if (editShift) {
      setShifts(prev => prev.map(s => s.id === editShift.id ? { ...s, ...form } : s));
      toast.success('Shift updated.');
    } else {
      setShifts(prev => [...prev, { id: Date.now().toString(), ...form, occupancy: 0, capacity: 40 }]);
      toast.success('Shift added.');
    }
    setShowModal(false);
  }

  function handleDeactivate() {
    if (!deactivateTarget) return;
    setShifts(prev => prev.map(s => s.id === deactivateTarget.id ? { ...s, active: false } : s));
    toast.success(`${deactivateTarget.name} shift deactivated.`);
    setDeactivateTarget(null);
  }

  function handleActivate(shift: Shift) {
    setShifts(prev => prev.map(s => s.id === shift.id ? { ...s, active: true } : s));
    toast.success(`${shift.name} shift activated.`);
  }

  return {
    shifts,
    showModal,
    setShowModal,
    editShift,
    form,
    setForm,
    errors,
    deactivateTarget,
    setDeactivateTarget,
    openAdd,
    openEdit,
    handleSave,
    handleDeactivate,
    handleActivate
  };
}
