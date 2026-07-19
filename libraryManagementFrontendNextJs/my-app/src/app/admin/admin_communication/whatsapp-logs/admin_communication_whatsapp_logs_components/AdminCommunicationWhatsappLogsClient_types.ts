// RESPONSIBILITY: Renders or handles logic for AdminCommunicationWhatsappLogsClient_types.ts.
import { useState } from "react";
import { ChevronRight, Eye, X } from "lucide-react";
import { ADMIN_COMMUNICATION_MOCK_WHATSAPP_LOGS } from "@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { TablePagination } from "@/components/ui/table-pagination";
export interface WaLog {
  id: string; dateTime: string; phone: string; student: string;
  type: 'welcome' | 'fee_reminder' | 'receipt' | 'notice' | 'renewal';
  status: 'Pending' | 'Sent' | 'Delivered' | 'Failed';
  error: string; message: string;
}

