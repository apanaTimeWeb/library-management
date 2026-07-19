// RESPONSIBILITY: Renders or handles logic for AdminEngagementHolidayCalendarClient_types.ts.
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Plus, Trash2, CalendarDays } from "lucide-react";
import { ADMIN_ENGAGEMENT_MOCK_HOLIDAYS, ADMIN_ENGAGEMENT_WEEK_DAYS } from "@/app/admin/admin_engagement/admin_engagement_constants/AdminEngagementConstants";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import toast from "react-hot-toast";
export interface Holiday { id: string; date: string; name: string; type: string; }

