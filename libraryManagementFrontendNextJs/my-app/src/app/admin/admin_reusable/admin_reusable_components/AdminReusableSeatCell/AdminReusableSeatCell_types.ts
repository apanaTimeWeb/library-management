import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminReusableSeatCellProps {
  id: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  occupant?: string;
  shift?: string;
  expiry?: string;
  onClick?: () => void;
}
