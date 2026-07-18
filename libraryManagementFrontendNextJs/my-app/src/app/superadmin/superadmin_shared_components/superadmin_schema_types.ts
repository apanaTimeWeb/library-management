import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type BranchDetailsData = z.infer<typeof branchDetailsSchema>;
export type ShiftsData = z.infer<typeof shiftsSchema>;
export type SeatsData = z.infer<typeof seatsSchema>;
export type PlansData = z.infer<typeof plansSchema>;
