// RESPONSIBILITY: Renders or handles logic for AdminAssetMaintenanceAddDialog_types.ts.
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { Wrench, X, Loader2 } from "lucide-react";
import { adminAssetMaintenanceFormSchema, AdminAssetMaintenanceFormData } from "@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export interface AdminAssetMaintenanceAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminAssetMaintenanceFormData) => Promise<{ success: boolean; message: string }>;
}

