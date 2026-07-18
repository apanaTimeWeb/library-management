import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminAsset {
  id: number;
  name: string;
  category: string;
  purchaseDate: string;
  purchaseValue: number;
  currentValue: number;
  location: string;
  status: 'active' | 'maintenance' | 'disposed';
}
