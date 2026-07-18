import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminSystemGapInterval { 
  start: number; 
  end: number; 
}
export interface SuperadminSystemGapDetail extends SuperadminSystemGapInterval { 
  label: string; 
  hours: number; 
}
export interface SuperadminSystemSeatGapRecord {
  seat: string;
  booked: SuperadminSystemGapInterval[];
  gap: SuperadminSystemGapDetail;
}
