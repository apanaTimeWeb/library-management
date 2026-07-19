// RESPONSIBILITY: Renders or handles logic for AdminEngagementAbsenteeReportClient_types.ts.
import { useState } from "react";
import { TablePagination } from "@/components/ui/table-pagination";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ChevronRight, Send, Mail, Phone, AlertCircle, Search } from "lucide-react";
import { ADMIN_ENGAGEMENT_MOCK_ABSENTEES } from "@/app/admin/admin_engagement/admin_engagement_constants/AdminEngagementConstants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
export interface AbsenteeRow {
  id: string; name: string; initials: string; smartId: string;
  shift: string; daysAbsent: number; lastSeen: string;
  parentPhone: string; parentEmail: string; notified: boolean;
}

