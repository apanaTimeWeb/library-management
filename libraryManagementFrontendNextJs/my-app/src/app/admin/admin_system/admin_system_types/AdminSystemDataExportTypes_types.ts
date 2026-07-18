import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminSystemExportModule {
  id: string;
  label: string;
  description: string;
  icon: string;
  estimatedRows: number;
  formats: string[];
}
export interface AdminSystemQuickExport {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  format: string;
}
