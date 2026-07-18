import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { Package, X, Loader2 } from "lucide-react";
import { adminAssetFormSchema, AdminAssetFormData } from "@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export interface AdminAssetsAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminAssetFormData) => Promise<{ success: boolean; message: string }>;
}
