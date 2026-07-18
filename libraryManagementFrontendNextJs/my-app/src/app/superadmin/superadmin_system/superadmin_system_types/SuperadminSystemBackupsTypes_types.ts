import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminSystemBackupRecord {
  id: string;
  name: string;
  type: 'auto' | 'manual';
  size: string;
  createdAt: string;
  status: 'success' | 'failed' | 'in-progress';
  modules: string[];
}
