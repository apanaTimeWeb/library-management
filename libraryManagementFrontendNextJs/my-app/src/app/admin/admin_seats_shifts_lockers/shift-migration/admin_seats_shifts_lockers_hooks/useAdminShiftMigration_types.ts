import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Student {
  id: string; 
  name: string; 
  smartId: string;
  currentShift: string; 
  currentSeat: string; 
  validTill: string; 
  plan: string; 
  dailyRate: number;
}
export type PayMode = 'Cash' | 'UPI' | 'Card';
