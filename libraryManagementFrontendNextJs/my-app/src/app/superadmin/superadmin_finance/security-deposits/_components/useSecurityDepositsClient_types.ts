import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type RefundFormData = z.infer<typeof refundSchema>;
export type DeductFormData = z.infer<typeof deductSchema>;
