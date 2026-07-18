import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deductSchema, DeductFormData } from "@/app/superadmin/superadmin_finance/security-deposits/_components/useSecurityDepositsClient";
export interface SecurityDepositDeductModalProps {
  target: { id: number; name: string } | null;
  onClose: () => void;
  onSubmit: (data: DeductFormData) => void;
  isProcessing: boolean;
}
