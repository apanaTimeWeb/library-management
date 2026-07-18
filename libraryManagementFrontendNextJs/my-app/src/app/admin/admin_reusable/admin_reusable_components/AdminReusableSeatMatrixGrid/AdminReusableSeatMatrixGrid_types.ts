import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminReusableSeatData {
  id: string;
  shift: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  fee: 'Paid' | 'Due';
  occupant?: string;
  expiry?: string;
  studentId?: string;
}
export interface Props {
  seats: AdminReusableSeatData[];
  shifts: string[];
}
