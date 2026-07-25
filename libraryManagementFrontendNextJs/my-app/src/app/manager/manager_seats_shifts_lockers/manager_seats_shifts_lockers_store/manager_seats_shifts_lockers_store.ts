import { create } from 'zustand';
import type { SeatData, FetchState, SeatsState, LockerData, SeatHistoryEntry } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';

// RESPONSIBILITY: Module-scoped Zustand store for managing Seat Matrix API data.

export const useSeatsStore = create<SeatsState>((set, get) => ({
  seatsData: [],
  lockerData: [],
  seatHistoryData: [],
  status: 'idle',
  error: null,
  fetchData: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const { fetchSeatMatrix } = await import('../manager_seats_shifts_lockers_api/manager_seats_shifts_lockers_api');
      const data = await fetchSeatMatrix();
      if (!Array.isArray(data) || data.length < 10 || String(data[0]?.id).startsWith('MOCK-')) {
        const mockSeats: SeatData[] = Array.from({ length: 60 }).map((_, i) => ({
          uuid: `S-${i}`,
          id: String(i + 1).padStart(2, '0'),
          status: (i % 7 === 0) ? 'maintenance' : 'free',
        }));
        set({ seatsData: mockSeats, status: 'success' });
        return;
      }
      const mapped: SeatData[] = data.map((s: any) => ({
        uuid: s.id,
        id: String(s.seatNumber || s.id || '').replace('S-', ''),
        status: (s.isActive ?? (String(s.status).toLowerCase() === 'free') ? 'free' : 'maintenance'),
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
      if (!Array.isArray(data) || data.length < 10 || String(data[0]?.id).startsWith('MOCK-')) {
        const mockLockers: LockerData[] = Array.from({ length: 120 }).map((_, i) => ({
          uuid: `L-${i}`,
          id: String(i + 1).padStart(3, '0'),
          status: (i % 12 === 0) ? 'Maintenance' : 'Free',
        }));
        set({ lockerData: mockLockers, status: 'success' });
        return;
      }
      const mapped: LockerData[] = data.map((l: any) => ({
        uuid: l.id,
        id: String(l.lockerNumber || l.id || '').replace('L-', ''),
        status: (l.isActive ?? (String(l.status).toLowerCase() === 'free') ? 'Free' : 'Maintenance'),
      }));
      set({ lockerData: mapped, status: 'success' });
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
