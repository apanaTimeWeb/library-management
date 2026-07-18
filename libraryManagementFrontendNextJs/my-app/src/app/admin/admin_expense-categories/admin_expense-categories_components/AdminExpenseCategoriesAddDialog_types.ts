import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { Tag, Loader2 } from "lucide-react";
import { adminExpenseCategoryFormSchema, AdminExpenseCategoryFormData } from "@/app/admin/admin_expense-categories/admin_expense-categories_types/admin_expense-categories_types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export interface AdminExpenseCategoriesAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminExpenseCategoryFormData) => Promise<{ success: boolean; message: string }>;
}
