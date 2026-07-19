// RESPONSIBILITY: Renders or handles logic for AdminCrmSidebar_types.ts.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneCall } from "lucide-react";
import { ADMIN_ROUTES } from "@/app/admin/admin_url_config";
import React from "react";
export interface AdminCrmSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

