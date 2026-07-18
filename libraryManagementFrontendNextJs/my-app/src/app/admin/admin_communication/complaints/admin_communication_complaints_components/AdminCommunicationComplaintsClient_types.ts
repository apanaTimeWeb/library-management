import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Complaint {
  id: string; title: string; student: string; isAnonymous: boolean;
  description: string; status: CStatus; date: string;
  resolvedBy: string; resolvedDate: string; resolvedNote: string;
}
export type CStatus = 'Open' | 'In-Progress' | 'Resolved';
