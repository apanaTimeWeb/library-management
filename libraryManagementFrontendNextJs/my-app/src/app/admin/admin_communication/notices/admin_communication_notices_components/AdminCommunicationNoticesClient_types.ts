import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Notice {
  id: string; title: string; message: string;
  validTill: string; postedBy: string; postedDate: string;
  status: 'Active' | 'Expired';
}
