import { Download, FileText, IndianRupee, Users, Wallet, TrendingUp, BarChart2, PieChart as PieIcon, Activity, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";
import { useState } from "react";
import { useAdminReports } from "@/app/admin/admin_reports/admin_reports_hooks/useAdminReports";
import { TablePagination } from "@/components/ui/table-pagination";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export interface AdminReportsClientProps {
  initialData?: Record<string, Record<string, unknown[]>>;
}
export interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  trend?: { up: boolean; value: string };
  sub?: string;
}
