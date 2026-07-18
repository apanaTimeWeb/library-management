import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminSystemMaintenanceSeat {
  id: string;
  status: SuperadminSystemMaintenanceSeatStatus;
  lastMaint: string;
  daysSince: number;
}
export interface SuperadminSystemMaintenanceAsset {
  name: string;
  qty: number;
  status: SuperadminSystemMaintenanceAssetStatus;
  lastServiced: string;
  nextDue: string;
  daysOverdue: number;
}
export interface SuperadminSystemMaintenanceLocker {
  id: string;
  status: SuperadminSystemMaintenanceLockerStatus;
  lastIssue: string;
}
export type SuperadminSystemMaintenanceSeatStatus = 'Needs Attention' | 'OK';
export type SuperadminSystemMaintenanceAssetStatus = 'Overdue' | 'Due Soon' | 'OK';
export type SuperadminSystemMaintenanceLockerStatus = 'Issue Reported' | 'OK';
