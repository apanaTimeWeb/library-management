import { useState, useEffect } from 'react';
import { useSeatsStore } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_context/manager_seats_shifts_lockers_store';
import toast from 'react-hot-toast';

// DATA FLOW: Hook -> useManagerSeatsLockerMatrix -> Consuming UI Component
export function useManagerSeatsLockerMatrix() {
  const [assignTarget, setAssignTarget] = useState<string | null>(null);
  const { lockerData, status, fetchLockers } = useSeatsStore();

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    if (status === 'idle' || lockerData.length === 0) {
      fetchLockers();
    }
  }, [status, lockerData.length, fetchLockers]);

  function handleCellClick(id: string, status: string) {
    if (status === 'free') { 
      setAssignTarget(id); 
    }
    if (status === 'occupied') { 
      toast.success(`Navigating to student profile for Locker ${id}`); 
    }
  }

  return {
    assignTarget,
    setAssignTarget,
    lockerData,
    handleCellClick,
  };
}
