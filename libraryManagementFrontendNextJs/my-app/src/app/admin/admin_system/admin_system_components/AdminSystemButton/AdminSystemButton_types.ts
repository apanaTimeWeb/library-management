import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT;
  size?: keyof typeof SIZE;
}
