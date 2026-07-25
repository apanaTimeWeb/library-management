// RESPONSIBILITY: Renders or handles logic for manager_seats_shifts_lockers_api.ts.

import { MOCK_DASHBOARD_DATA, MOCK_SEAT_MATRIX, MOCK_LOCKER_MATRIX, MOCK_SEAT_HISTORY } from '@/app/manager/manager_mock_data';
import { fetchApi } from '@/lib/api';
import { SeatData, LockerData, SeatHistoryEntry } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';

// MOCK APIs for seats and lockers to prevent 500 errors
export async function fetchSeatMatrix(): Promise<SeatData[]> {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_SEAT_MATRIX as unknown as SeatData[]), 500));
}

export async function fetchLockerMatrix(): Promise<LockerData[]> {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_LOCKER_MATRIX as unknown as LockerData[]), 500));
}

export async function fetchSeatHistory(): Promise<SeatHistoryEntry[]> {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_SEAT_HISTORY as unknown as SeatHistoryEntry[]), 500));
}

