import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AbsenteeRow {
  id: string; name: string; initials: string; smartId: string;
  shift: string; daysAbsent: number; lastSeen: string;
  parentPhone: string; parentEmail: string; notified: boolean;
}
