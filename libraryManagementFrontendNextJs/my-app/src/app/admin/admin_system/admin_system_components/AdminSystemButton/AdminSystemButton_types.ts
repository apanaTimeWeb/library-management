import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'ghost' | 'link' | string;
  size?: 'default' | 'sm' | 'lg' | 'icon' | string;
}
