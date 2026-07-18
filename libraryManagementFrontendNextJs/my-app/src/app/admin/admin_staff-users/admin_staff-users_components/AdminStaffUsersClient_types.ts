import { useState } from "react";
import { UserPlus, Pencil, Trash2, CheckCircle, Search, Users, X } from "lucide-react";
import { useAdminStaff, type StaffMember } from "@/app/admin/admin_staff-users/admin_staff-users_hooks/useAdminStaff";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TablePagination } from "@/components/ui/table-pagination";
export interface AdminStaffUsersClientProps {
  initialStaff: StaffMember[];
}
