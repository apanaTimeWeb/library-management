import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminReusableChartCardProps {
  title: string;
  badge?: string;
  /** Dynamic color value — must be a CSS token string like 'var(--success)' */
  badgeColor?: string;
  legend?: { label: string; color: string }[];
  children: React.ReactNode;
}
