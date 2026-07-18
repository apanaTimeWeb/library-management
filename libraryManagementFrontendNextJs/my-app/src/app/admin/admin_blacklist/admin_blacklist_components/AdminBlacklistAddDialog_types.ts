import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { AlertOctagon, Loader2 } from "lucide-react";
import { adminBlacklistFormSchema, AdminBlacklistFormData } from "@/app/admin/admin_blacklist/admin_blacklist_types/admin_blacklist_types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export interface AdminBlacklistAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminBlacklistFormData) => Promise<{ success: boolean; message: string }>;
}
