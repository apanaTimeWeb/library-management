import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminEngagementScanResult {
  name: string;
  initials: string;
  smartId: string;
  shift: string;
  validTill: string;
  plan: string;
}
export interface SuperadminEngagementStudent {
  id: string;
  smartId: string;
  name: string;
  initials: string;
  shift: string;
  consecutiveAbsent: number;
  status: SuperadminEngagementAttStatus;
  inTime: string;
  outTime: string;
}
export interface SuperadminEngagementHoliday {
  id: string;
  date: string;
  name: string;
  type: string;
}
export interface SuperadminEngagementAbsenteeRow {
  id: string;
  name: string;
  initials: string;
  smartId: string;
  shift: string;
  daysAbsent: number;
  lastSeen: string;
  parentPhone: string;
  parentEmail: string;
  notified: boolean;
}
export type SuperadminEngagementScanState = 'idle' | 'scanning' | 'detected' | 'success';
export type SuperadminEngagementAttStatus = 'present' | 'absent' | 'late' | null;
