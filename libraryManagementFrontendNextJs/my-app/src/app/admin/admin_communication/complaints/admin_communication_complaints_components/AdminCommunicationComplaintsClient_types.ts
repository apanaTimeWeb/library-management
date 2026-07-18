import { useState, useMemo, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { logger } from "@/lib/logger";
import { ChevronRight, Plus, X, Eye, RefreshCw, CheckCircle } from "lucide-react";
import { ADMIN_COMMUNICATION_MOCK_COMPLAINTS, ADMIN_COMMUNICATION_COMPLAINTS_TABS } from "@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { TablePagination } from "@/components/ui/table-pagination";
export interface Complaint {
  id: string; title: string; student: string; isAnonymous: boolean;
  description: string; status: CStatus; date: string;
  resolvedBy: string; resolvedDate: string; resolvedNote: string;
}
export type CStatus = 'Open' | 'In-Progress' | 'Resolved';
