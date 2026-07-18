import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminPlansAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminPlanFormData, editingId?: string | null) => Promise<{ success: boolean; message: string }>;
  editingPlan?: PlanRecord | null;
}
