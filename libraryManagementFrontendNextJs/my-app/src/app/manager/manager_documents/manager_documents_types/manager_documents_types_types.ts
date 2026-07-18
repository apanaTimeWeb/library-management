import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface DocumentRecord {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  date: string;
  category: string;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
