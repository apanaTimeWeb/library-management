import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode?: number;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
