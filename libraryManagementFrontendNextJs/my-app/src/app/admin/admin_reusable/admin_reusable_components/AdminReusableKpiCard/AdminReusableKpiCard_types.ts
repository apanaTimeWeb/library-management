import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminReusableKpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: { value: string; up: boolean };
  sub?: string;
}
