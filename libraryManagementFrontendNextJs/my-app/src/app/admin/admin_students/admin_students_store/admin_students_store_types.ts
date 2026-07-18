import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminStudentsState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}
