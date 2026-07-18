import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface PreviewRow {
  row: number;
  name: string;
  phone: string;
  email: string;
  shift: string;
  seat: string;
  status: RowStatus;
  issue?: string;
}
export type RowStatus = 'ok' | 'error' | 'warning';
export type ImportStep = 'upload' | 'preview' | 'importing' | 'done';
