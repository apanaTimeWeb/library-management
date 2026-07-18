// RESPONSIBILITY: Renders the useAdminLockers.ts component/hook.
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { ADMIN_SEATS_MOCK_LOCKERS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_data/AdminSeatsMockData';

export type LockerStatus = 'Free' | 'Occupied' | 'Maintenance';

export interface Locker {
  id: string;
  lockerId: string;
  status: LockerStatus;
  assignedTo: string;
  studentId: string;
  assignedSince: string;
}

export function useAdminLockers() {
  const [lockers, setLockers] = useState<Locker[]>(ADMIN_SEATS_MOCK_LOCKERS as Locker[]);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [showAssign, setShowAssign] = useState<Locker | null>(null);
  const [assignSearch, setAssignSearch] = useState('');
  const [freeTarget, setFreeTarget] = useState<Locker | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLockerId, setNewLockerId] = useState('');
  const [addError, setAddError] = useState('');

  const filtered = useMemo(() => {
    return lockers.filter(l => statusFilter === 'All Statuses' || l.status === statusFilter);
  }, [lockers, statusFilter]);

  function handleAssign() {
    if (!showAssign || !assignSearch.trim()) return;
    setLockers(prev => prev.map(l => l.id === showAssign.id
      ? { ...l, status: 'Occupied', assignedTo: assignSearch, studentId: 'LIB-NEW', assignedSince: 'Today' }
      : l
    ));
    toast.success(`Locker ${showAssign.lockerId} assigned to ${assignSearch}.`);
    setShowAssign(null);
    setAssignSearch('');
  }

  function handleFreeLocker() {
    if (!freeTarget) return;
    setLockers(prev => prev.map(l => l.id === freeTarget.id
      ? { ...l, status: 'Free', assignedTo: '—', studentId: '—', assignedSince: '—' }
      : l
    ));
    toast.success(`Locker ${freeTarget.lockerId} is now free.`);
    setFreeTarget(null);
  }

  function handleMarkMaintenance(locker: Locker) {
    setLockers(prev => prev.map(l => l.id === locker.id ? { ...l, status: 'Maintenance' } : l));
    toast.success(`Locker ${locker.lockerId} marked as Maintenance.`);
  }

  function handleAddLocker() {
    if (!newLockerId.trim()) { setAddError('Locker ID is required'); return; }
    if (lockers.some(l => l.lockerId === newLockerId.trim())) { setAddError('Locker ID already exists'); return; }
    setLockers(prev => [...prev, {
      id: Date.now().toString(), lockerId: newLockerId.trim(),
      status: 'Free', assignedTo: '—', studentId: '—', assignedSince: '—',
    }]);
    toast.success(`Locker ${newLockerId.trim()} added.`);
    setShowAddModal(false);
    setNewLockerId('');
    setAddError('');
  }

  return {
    lockers,
    statusFilter,
    setStatusFilter,
    showAssign,
    setShowAssign,
    assignSearch,
    setAssignSearch,
    freeTarget,
    setFreeTarget,
    showAddModal,
    setShowAddModal,
    newLockerId,
    setNewLockerId,
    addError,
    setAddError,
    filtered,
    handleAssign,
    handleFreeLocker,
    handleMarkMaintenance,
    handleAddLocker
  };
}
