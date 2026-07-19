// RESPONSIBILITY: Renders or handles logic for AdminSystemKpiCard_types.ts.
import { cn } from "@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import React from "react";
export interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  className?: string;
}

