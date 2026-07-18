import { useState } from "react";
import { ChevronRight, ArrowRight, CheckCheck } from "lucide-react";
import { ADMIN_COMMUNICATION_MOCK_NOTIFICATIONS, ADMIN_COMMUNICATION_NOTIFICATION_CATS } from "@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
export interface Notification {
  id: string; category: 'Finance' | 'CRM' | 'Operations' | 'Attendance';
  icon: string; title: string; description: string;
  time: string; priority: 'High' | 'Medium'; link: string; read: boolean;
}
export type Category = 'All' | 'Finance' | 'CRM' | 'Operations' | 'Attendance' | 'High Only';
