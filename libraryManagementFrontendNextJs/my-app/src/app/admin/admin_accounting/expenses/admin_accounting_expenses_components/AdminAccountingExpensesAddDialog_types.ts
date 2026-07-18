import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { IndianRupee, X, Loader2 } from "lucide-react";
import { adminAccountingExpenseFormSchema, AdminAccountingExpenseFormData } from "@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export interface AdminAccountingExpensesAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminAccountingExpenseFormData) => Promise<{ success: boolean; message: string }>;
}
