import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminReusableSeatCell from "@/app/admin/admin_reusable/admin_reusable_components/AdminReusableSeatCell/AdminReusableSeatCell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ADMIN_ROUTES } from "@/app/admin/admin_url_config";
export interface AdminReusableSeatData {
  id: string;
  shift: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  fee: 'Paid' | 'Due';
  occupant?: string;
  expiry?: string;
  studentId?: string;
}
export interface Props {
  seats: AdminReusableSeatData[];
  shifts: string[];
}
