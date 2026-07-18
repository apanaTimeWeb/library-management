import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminExpenseCategory {
  id: number;
  name: string;
  budget: number;
  spent: number;
  color: string;
}
