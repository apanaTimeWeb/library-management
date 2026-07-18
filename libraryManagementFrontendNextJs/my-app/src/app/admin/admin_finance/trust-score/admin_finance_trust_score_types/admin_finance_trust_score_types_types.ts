import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type AdminFinanceTrustScoreStudent = {
  rank: number;
  studentName: string;
  smartId: string;
  shift: 'Morning' | 'Evening' | 'Full Day';
  trustScore: number;
  totalPromises: number;
  timesChanged: number;
  fulfilledCount: number;
  badge: 'reliable' | 'moderate' | 'low';
};
