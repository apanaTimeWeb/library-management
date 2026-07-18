import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminReusableActionItem {
  icon: LucideIcon;
  label: string;
  count: number;
  type: 'danger' | 'warning';
  href: string;
}
