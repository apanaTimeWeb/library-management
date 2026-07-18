import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface ScanResult {
  name: string; initials: string; smartId: string;
  shift: string; validTill: string; plan: string;
}
export type ScanState = 'idle' | 'scanning' | 'detected' | 'success';
