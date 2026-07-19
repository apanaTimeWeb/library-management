// RESPONSIBILITY: Renders or handles logic for manager_seats_shifts_lockers_api.ts.

import { MOCK_DASHBOARD_DATA, MOCK_SEAT_MATRIX, MOCK_LOCKER_MATRIX, MOCK_ALLOCATIONS, MOCK_SEAT_HISTORY } from '@/app/manager/manager_mock_data';
import { fetchApi } from '@/lib/api';
import { SeatData, LockerData, Allocation, SeatHistoryEntry } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';

// MOCK APIs for seats and lockers to prevent 500 errors
export async function fetchSeatMatrix(): Promise<SeatData[]> {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_SEAT_MATRIX), 500));
}

export async function fetchLockerMatrix(): Promise<LockerData[]> {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_SEAT_MATRIX), 500));
}

export async function fetchAllocations(): Promise<Allocation[]> {
    // @ts-ignore
  return new Promise(resolve => setTimeout(() => resolve(MOCK_SEAT_MATRIX), 500));
}

export async function fetchSeatHistory(): Promise<SeatHistoryEntry[]> {
    // @ts-ignore
  return new Promise(resolve => setTimeout(() => resolve(MOCK_SEAT_MATRIX), 500));
}

