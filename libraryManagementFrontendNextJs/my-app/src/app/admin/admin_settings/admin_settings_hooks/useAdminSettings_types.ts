import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SettingsState {
  libraryName: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  gstin: string;
  receiptPrefix: string;
  taxPercentage: string;
  termsAndConditions: string;
}
