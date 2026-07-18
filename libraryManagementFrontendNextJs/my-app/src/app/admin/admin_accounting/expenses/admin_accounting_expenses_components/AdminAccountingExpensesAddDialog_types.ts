import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminAccountingExpensesAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminAccountingExpenseFormData) => Promise<{ success: boolean; message: string }>;
}
