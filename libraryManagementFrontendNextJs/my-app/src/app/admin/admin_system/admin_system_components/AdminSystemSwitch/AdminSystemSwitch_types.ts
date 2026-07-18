import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils";
import React from "react";
export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}
