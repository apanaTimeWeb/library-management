import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatCurrency } from "@/app/superadmin/superadmin_finance/superadmin_finance_utils/Superadminsuperadmin_format";
import { SuperadminSearchableDropdown } from "@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown";
export const payoutSchema = z.object({ paymentMethod: z.enum(['upi', 'bank', 'cash']) });
export type PayoutFormData = z.infer<typeof payoutSchema>;
