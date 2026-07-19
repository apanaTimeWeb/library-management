// RESPONSIBILITY: Renders or handles logic for AdminPlansAddDialog_types.ts.
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { IndianRupee, Loader2 } from "lucide-react";
import { adminPlanFormSchema, AdminPlanFormData, PlanRecord } from "@/app/admin/admin_plans/admin_plans_types/admin_plans_types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export interface AdminPlansAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminPlanFormData, editingId?: string | null) => Promise<{ success: boolean; message: string }>;
  editingPlan?: PlanRecord | null;
}

