import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminBlacklistAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminBlacklistFormData) => Promise<{ success: boolean; message: string }>;
}
