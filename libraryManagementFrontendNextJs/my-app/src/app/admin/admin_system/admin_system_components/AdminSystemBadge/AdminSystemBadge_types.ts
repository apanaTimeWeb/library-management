// RESPONSIBILITY: Renders or handles logic for AdminSystemBadge_types.ts.
import { cn } from "@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils";
import React from "react";
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | string;
}

