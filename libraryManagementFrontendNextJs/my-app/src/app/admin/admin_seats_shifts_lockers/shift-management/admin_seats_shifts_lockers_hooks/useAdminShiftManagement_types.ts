import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  occupancy: number;
  capacity: number;
  active: boolean;
}
