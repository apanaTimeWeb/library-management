// RESPONSIBILITY: Renders or handles logic for AdminHeader_types.ts.
import { Building2, Bell, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAdmin } from "@/app/admin/admin_store/AdminContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React from "react";
export interface AdminHeaderProps {
  sidebarWidth: number;
  onMobileOpen: () => void;
}

