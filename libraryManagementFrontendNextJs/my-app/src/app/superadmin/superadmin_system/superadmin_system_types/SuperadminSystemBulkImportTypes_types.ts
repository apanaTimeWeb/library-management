import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminSystemBulkImportPreviewRow {
  row: number;
  name: string;
  phone: string;
  email: string;
  shift: string;
  seat: string;
  status: SuperadminSystemBulkImportRowStatus;
  issue?: string;
}
export type SuperadminSystemBulkImportRowStatus = 'ok' | 'error' | 'warning';
export type SuperadminSystemBulkImportStep = 'upload' | 'preview' | 'importing' | 'done';
