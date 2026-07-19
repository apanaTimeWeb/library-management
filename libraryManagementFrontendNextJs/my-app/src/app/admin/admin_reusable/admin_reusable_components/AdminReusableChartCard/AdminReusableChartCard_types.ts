// RESPONSIBILITY: Renders or handles logic for AdminReusableChartCard_types.ts.
import { Card } from "@/components/ui/card";
import React from "react";
export interface AdminReusableChartCardProps {
  title: string;
  badge?: string;
  /** Dynamic color value — must be a CSS token string like 'var(--success)' */
  badgeColor?: string;
  legend?: { label: string; color: string }[];
  children: React.ReactNode;
}

