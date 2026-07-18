import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface DashboardStats {
  totalCollections: number; 
  collectionsGrowth: number; 
  activeStudents: number;
  expiringSoon: number; 
  suspended: number; 
  totalReferrals: number;
  depositsHeld: number; 
  pendingPromises: number; 
  overdueStudents: number;
  pendingRefunds: number; 
  renewalsDue: number; 
  lateFeeAccrued: number;
}
export interface RecentPayment {
  id: number; 
  studentName: string; 
  studentSmartId: string;
  amount: number; 
  mode: string; 
  date: string;
}
