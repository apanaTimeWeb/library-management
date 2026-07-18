import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { refundSchema, RefundFormData } from "@/app/superadmin/superadmin_finance/security-deposits/_components/useSuperadminSecurityDepositsClient";
export interface SecurityDepositRefundModalProps {
  target: { id: number; name: string; amount: number } | null;
  onClose: () => void;
  onSubmit: (data: RefundFormData) => void;
  isProcessing: boolean;
}
