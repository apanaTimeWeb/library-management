import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AbsenteeRow {
  id: string; name: string; initials: string; smartId: string;
  shift: string; daysAbsent: number; lastSeen: string;
  parentPhone: string; parentEmail: string; notified: boolean;
}
export interface ScanResult {
  name: string; initials: string; smartId: string;
  shift: string; validTill: string; plan: string;
}
export interface Holiday { id: string; date: string; name: string; type: string; }
export type ScanState = 'idle' | 'scanning' | 'detected' | 'success';
