// RESPONSIBILITY: Renders the useAdminLockerMatrix.ts component/hook.
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import {
  ADMIN_SEATS_MOCK_LOCKER_STATS,
  ADMIN_SEATS_MOCK_LOCKER_LEGEND,
  ADMIN_SEATS_MOCK_LOCKER_ACTIVITY
} from '@/app/admin/admin_seats_shifts_lockers/admin_seats_shifts_lockers_utils/AdminSeatsMockData';


export interface LockerData {
  uuid?: string; 
  id: string; 
  status: 'free' | 'occupied' | 'maintenance';
}

export function useAdminLockerMatrix() {
  const [assignTarget, setAssignTarget] = useState<string | null>(null);
  const [lockerData, setLockerData] = useState<LockerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    fetchApi('/seats_shifts_lockers/lockers')
      .then((data: Array<Record<string, unknown>>) => {
        type ApiLockerData = { id?: string; lockerNumber?: string; isActive?: boolean; };
        const mapped = data.map(( l: ApiLockerData ) => ({
          uuid: l.id,
          id: (l.lockerNumber || '').replace('L-', ''),
          status: l.isActive ? 'free' : 'maintenance',
        }));
        setLockerData(mapped);
        setIsLoading(false);
      })
      .catch(e => {
        logger.error('Locker matrix fetch failed:', e);
        setIsLoading(false);
      });
  }, []);

  function handleCellClick(id: string, status: string) {
    if (status === 'free') { 
      setAssignTarget(id); 
    } else if (status === 'occupied') { 
      toast.success(`Navigating to student profile for Locker ${id}`); 
    }
  }

  function handleAssign() {
    toast.success(`Locker ${assignTarget} assigned.`);
    setAssignTarget(null);
  }

  return {
    assignTarget,
    setAssignTarget,
    lockerData,
    isLoading,
    handleCellClick,
    handleAssign,
    ADMIN_SEATS_MOCK_LOCKER_STATS,
    ADMIN_SEATS_MOCK_LOCKER_LEGEND,
    ADMIN_SEATS_MOCK_LOCKER_ACTIVITY
  };
}


