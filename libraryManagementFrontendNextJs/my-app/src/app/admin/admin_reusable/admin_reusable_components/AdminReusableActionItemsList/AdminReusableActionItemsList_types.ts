import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import React from "react";
export interface AdminReusableActionItem {
  icon: LucideIcon;
  label: string;
  count: number;
  type: 'danger' | 'warning';
  href: string;
}
