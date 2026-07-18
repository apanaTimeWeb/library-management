import { useState } from "react";
import { Input } from "@/components/ui/input";
import React from "react";
import { Shield, CheckCircle, Search } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAdminPermissions, type Permission } from "@/app/admin/admin_permissions/admin_permissions_hooks/useAdminPermissions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TablePagination } from "@/components/ui/table-pagination";
export interface AdminPermissionsViewProps {
  initialPermissions: Permission[];
}
