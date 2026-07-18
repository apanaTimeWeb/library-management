import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminSystemState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}
