// DATA FLOW: SuperadminSeatsMockData -> useSuperadminSeatsLockers -> SuperadminSeatsLockersClient
import { useState, useMemo, useCallback } from 'react';
import { SUPERADMIN_SEATS_MOCK_LOCKERS } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_shifts_lockers_utils/SuperadminSeatsMockData';
import { SuperadminSeatsLocker } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsLockersTypes';
import toast from 'react-hot-toast';

export function useSuperadminSeatsLockers() {
  const [lockers, setLockers] = useState<SuperadminSeatsLocker[]>(SUPERADMIN_SEATS_MOCK_LOCKERS as SuperadminSeatsLocker[]);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  
  // Modals state
  const [showAssign, setShowAssign] = useState<SuperadminSeatsLocker | null>(null);
  const [assignSearch, setAssignSearch] = useState('');
  const [freeTarget, setFreeTarget] = useState<SuperadminSeatsLocker | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLockerId, setNewLockerId] = useState('');
  const [addError, setAddError] = useState('');

  const filteredLockers = useMemo(() => {
    return lockers.filter(l => statusFilter === 'All Statuses' || l.status === statusFilter);
  }, [lockers, statusFilter]);

  const handleAssign = useCallback(() => {
    if (!showAssign || !assignSearch.trim()) return;
    setLockers(prev => prev.map(l => l.id === showAssign.id
      ? { ...l, status: 'Occupied', assignedTo: assignSearch, studentId: 'LIB-NEW', assignedSince: 'Today' }
      : l
    ));
    toast.success(`Locker ${showAssign.lockerId} assigned to ${assignSearch}.`);
    setShowAssign(null);
    setAssignSearch('');
  }, [showAssign, assignSearch]);

  const handleFreeLocker = useCallback(() => {
    if (!freeTarget) return;
    setLockers(prev => prev.map(l => l.id === freeTarget.id
      ? { ...l, status: 'Free', assignedTo: '—', studentId: '—', assignedSince: '—' }
      : l
    ));
    toast.success(`Locker ${freeTarget.lockerId} is now free.`);
    setFreeTarget(null);
  }, [freeTarget]);

  const handleMarkMaintenance = useCallback((locker: SuperadminSeatsLocker) => {
    setLockers(prev => prev.map(l => l.id === locker.id ? { ...l, status: 'Maintenance' } : l));
    toast.success(`Locker ${locker.lockerId} marked as Maintenance.`);
  }, []);

  const handleAddLocker = useCallback(() => {
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
  }, [newLockerId, lockers]);

  const openAddModal = useCallback(() => {
    setNewLockerId('');
    setAddError('');
    setShowAddModal(true);
  }, []);

  return {
    filteredLockers,
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
    handleAssign,
    handleFreeLocker,
    handleMarkMaintenance,
    handleAddLocker,
    openAddModal
  };
}
