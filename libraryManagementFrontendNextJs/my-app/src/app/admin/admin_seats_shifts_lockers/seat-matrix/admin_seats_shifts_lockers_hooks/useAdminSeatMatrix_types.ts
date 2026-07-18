import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SeatData {
  uuid?: string;
  id: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  student?: string;
  smartId?: string;
  shift?: string;
  expiry?: string;
}
