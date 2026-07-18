import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminDashboardState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}
