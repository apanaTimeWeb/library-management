// RESPONSIBILITY: Renders the useAdminSeatMatrix.ts component/hook.
import { useState, useEffect, useMemo } from 'react';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import { ADMIN_SEATS_MOCK_SHIFT_TABS, ADMIN_SEATS_MOCK_LEGEND_ITEMS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_shifts_lockers_utils/AdminSeatsMockData';


export interface SeatData {
  uuid?: string;
  id: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  student?: string;
  smartId?: string;
  shift?: string;
  expiry?: string;
}

export function useAdminSeatMatrix() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedSeat, setSelectedSeat] = useState<SeatData | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [seatsData, setSeatsData] = useState<SeatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    fetchApi('/seats_shifts_lockers/seat-matrix')
      .then(data => {
        type ApiSeatData = { id?: string; seatNumber?: string; isActive?: boolean; };
        const mapped = data.map(( s: ApiSeatData ) => ({
          uuid: s.id,
          id: (s.seatNumber || '').replace('S-', ''),
          status: s.isActive ? 'free' : 'maintenance',
        }));
        setSeatsData(mapped);
        setIsLoading(false);
      })
      .catch(e => {
        logger.error('Seat matrix fetch failed:', e);
        setIsLoading(false);
      });
  }, []);

  const visible = useMemo(() => {
    if (activeTab === 'All') return seatsData;
    return seatsData.filter(s => s.shift === activeTab || s.status === 'free' || s.status === 'maintenance');
  }, [activeTab, seatsData]);

  const freeSeatsCount = useMemo(() => {
    return visible.filter(s => s.status === 'free').length;
  }, [visible]);

  return {
    activeTab,
    setActiveTab,
    selectedSeat,
    setSelectedSeat,
    date,
    setDate,
    visible,
    freeSeatsCount,
    isLoading,
    ADMIN_SEATS_MOCK_SHIFT_TABS,
    ADMIN_SEATS_MOCK_LEGEND_ITEMS
  };
}
