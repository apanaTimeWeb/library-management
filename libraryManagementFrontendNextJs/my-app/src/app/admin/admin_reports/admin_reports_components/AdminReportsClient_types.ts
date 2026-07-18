import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminReportsClientProps {
  initialData?: Record<string, Record<string, unknown[]>>;
}
export interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  trend?: { up: boolean; value: string };
  sub?: string;
}
