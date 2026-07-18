import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminMaintenanceLog {
  id: number;
  assetName: string;
  issue: string;
  reportedDate: string;
  scheduledDate: string;
  vendor: string;
  cost: number;
  status: 'pending' | 'in-progress' | 'completed';
}
