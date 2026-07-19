// RESPONSIBILITY: Renders or handles logic for AdminEngagementAttendanceClient_types.ts.
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Save, FileBarChart2, Bell, CheckCircle, Clock } from "lucide-react";
import { ADMIN_ENGAGEMENT_MOCK_ATTENDANCE } from "@/app/admin/admin_engagement/admin_engagement_constants/AdminEngagementConstants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
export interface Student {
  id: string; smartId: string; name: string; initials: string;
  shift: string; consecutiveAbsent: number;
  status: AttStatus; inTime: string; outTime: string;
}
export type AttStatus = 'present' | 'absent' | 'late' | null;

