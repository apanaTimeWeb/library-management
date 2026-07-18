import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminCouponsAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminCouponFormData) => Promise<{ success: boolean; message: string }>;
}
