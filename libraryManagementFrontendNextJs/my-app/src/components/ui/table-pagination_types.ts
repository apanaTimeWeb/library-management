import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface TablePaginationProps {
  page: number;
  limit: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}
