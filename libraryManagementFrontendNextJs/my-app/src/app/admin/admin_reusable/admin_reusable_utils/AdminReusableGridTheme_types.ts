import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminGridCell<TValue = unknown, TData = unknown> {
  value: TValue;
  data?: TData;
}
export type AdminRecord = Record<string, unknown>;
