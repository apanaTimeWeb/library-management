// RESPONSIBILITY: Renders or handles logic for AdminReusableKpiCard_types.ts.
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import React from "react";
export interface AdminReusableKpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: { value: string; up: boolean };
  sub?: string;
}

