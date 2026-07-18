import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { Tag, Loader2 } from "lucide-react";
import { adminCouponFormSchema, AdminCouponFormData } from "@/app/admin/admin_coupons/admin_coupons_types/admin_coupons_types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export interface AdminCouponsAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminCouponFormData) => Promise<{ success: boolean; message: string }>;
}
