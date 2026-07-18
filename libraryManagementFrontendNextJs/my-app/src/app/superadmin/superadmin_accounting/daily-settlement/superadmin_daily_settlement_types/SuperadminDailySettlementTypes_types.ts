import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminDailySettlementEntry {
  id: number;
  shift: string;
  openingBalance: number;
  cashCollected: number;
  upiCollected: number;
  expenses: number;
  closingBalance: number;
  settledBy: string;
  status: 'pending' | 'settled';
}
