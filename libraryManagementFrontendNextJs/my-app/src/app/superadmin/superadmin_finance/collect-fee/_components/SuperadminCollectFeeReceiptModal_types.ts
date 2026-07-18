import React from "react";
import { BookOpen, CheckCircle, MessageSquare, Printer, X } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsappUtils";
import { formatCurrency } from "@/app/superadmin/superadmin_finance/superadmin_finance_utils/Superadminsuperadmin_format";
import type { SuperadminFinanceReceiptData, SuperadminFinanceCollectFeeMode } from "@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes";
export interface Props {
  receiptData: SuperadminFinanceReceiptData;
  onClose: () => void;
}
