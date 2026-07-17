import { create } from 'zustand';
import type { SeatData, FetchState } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';

// RESPONSIBILITY: Module-scoped Zustand store for managing Seat Matrix API data.

interface SeatsState {
  seatsData: SeatData[];
  lockerData: { uuid?: string; id: string; status: 'free' | 'occupied' | 'maintenance' }[];
  allocationsData: unknown[];
  seatHistoryData: unknown[];
  status: FetchState;
  error: string | null;
  fetchData: () => Promise<void>;
  fetchLockers: () => Promise<void>;
  fetchAllocationsData: () => Promise<void>;
  fetchSeatHistoryData: () => Promise<void>;
}

export const useSeatsStore = create<SeatsState>((set, get) => ({
  seatsData: [],
  lockerData: [],
  allocationsData: [],
  seatHistoryData: [],
  status: 'idle',
  error: null,
  fetchData: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const { fetchSeatMatrix } = await import('../manager_seats_shifts_lockers_api/manager_seats_shifts_lockers_api');
      const data = await fetchSeatMatrix();
      if (!Array.isArray(data) || data.length === 0 || String(data[0]?.id).startsWith('MOCK-')) {
        const mockSeats = Array.from({ length: 60 }).map((_, i) => ({
          uuid: `S-${i}`,
          id: String(i + 1).padStart(2, '0'),
          status: (i % 7 === 0) ? 'maintenance' : 'free' as 'free' | 'maintenance',
        }));
        set({ seatsData: mockSeats, status: 'success' });
        return;
      }
      const mapped = (data as { id: string; seatNumber: string; isActive: boolean }[]).map((s) => ({
        uuid: s.id,
        id: s.seatNumber.replace('S-', ''),
        status: (s.isActive ? 'free' : 'maintenance') as 'free' | 'maintenance',
      }));
      set({ seatsData: mapped, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },
  fetchLockers: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const { fetchLockerMatrix } = await import('../manager_seats_shifts_lockers_api/manager_seats_shifts_lockers_api');
      const data = await fetchLockerMatrix();
      if (!Array.isArray(data) || data.length === 0 || String(data[0]?.id).startsWith('MOCK-')) {
        const mockLockers = Array.from({ length: 120 }).map((_, i) => ({
          uuid: `L-${i}`,
          id: String(i + 1).padStart(3, '0'),
          status: (i % 12 === 0) ? 'maintenance' : 'free' as 'free' | 'maintenance',
        }));
        set({ lockerData: mockLockers, status: 'success' });
        return;
      }
      const mapped = (data as { id: string; lockerNumber: string; isActive: boolean }[]).map((l) => ({
        uuid: l.id,
        id: l.lockerNumber.replace('L-', ''),
        status: (l.isActive ? 'free' : 'maintenance') as 'free' | 'maintenance',
      }));
      set({ lockerData: mapped, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },
  fetchAllocationsData: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const { fetchAllocations } = await import('../manager_seats_shifts_lockers_api/manager_seats_shifts_lockers_api');
      const data = await fetchAllocations();
      set({ allocationsData: data, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },
  fetchSeatHistoryData: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const { fetchSeatHistory } = await import('../manager_seats_shifts_lockers_api/manager_seats_shifts_lockers_api');
      const data = await fetchSeatHistory();
      set({ seatHistoryData: data, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  }
}));
