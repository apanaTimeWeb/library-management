'use client';
﻿
// RESPONSIBILITY: Renders or handles logic for ManagerSeatsShiftMigrationHelpers.ts.
export const SHIFTS = [
  { name: 'Morning',   seats: 4, rate: 33 },
  { name: 'Afternoon', seats: 8, rate: 36 },
  { name: 'Evening',   seats: 2, rate: 40 },
  { name: 'Full Day',  seats: 1, rate: 50 },
];

export function daysRemaining(validTill: string): number {
  const diff = new Date(validTill).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

