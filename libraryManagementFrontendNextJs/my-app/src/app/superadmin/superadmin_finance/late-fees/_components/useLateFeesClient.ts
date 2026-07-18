/**
 * RESPONSIBILITY: Logic and state management for the LateFeesClient component.
 */
import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { openWhatsApp } from '@/lib/whatsappUtils';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import type { SuperadminFinanceLateFeesConfig, SuperadminFinanceOverdueStudent } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_CONFIG_LATE_FEES, SUPERADMIN_FINANCE_MOCK_OVERDUE_STUDENTS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';
import { LateFeesConfigFormData } from "./useLateFeesClient_types";

export const lateFeesConfigSchema = z.object({
  gracePeriodDays: z.number().min(0, 'Cannot be negative'),
  penaltyPerDay: z.number().min(0, 'Cannot be negative'),
});

export function useLateFeesClient() {
  const router = useRouter();
  const [config, setConfig] = useState<SuperadminFinanceLateFeesConfig | null>(null);
  const [overdue, setOverdue] = useState<SuperadminFinanceOverdueStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<LateFeesConfigFormData>({
    resolver: zodResolver(lateFeesConfigSchema),
    defaultValues: { gracePeriodDays: 0, penaltyPerDay: 0 },
    mode: 'onTouched',
  });

  useEffect(() => {
    const t = setTimeout(() => { 
      setConfig(SUPERADMIN_FINANCE_MOCK_CONFIG_LATE_FEES); 
      setOverdue(SUPERADMIN_FINANCE_MOCK_OVERDUE_STUDENTS); 
      form.reset({ 
        gracePeriodDays: SUPERADMIN_FINANCE_MOCK_CONFIG_LATE_FEES.gracePeriodDays, 
        penaltyPerDay: SUPERADMIN_FINANCE_MOCK_CONFIG_LATE_FEES.penaltyPerDay 
      });
      setIsLoading(false); 
    }, 700);
    return () => clearTimeout(t);
  }, [form]);

  const startEdit = () => {
    if (config) {
      form.reset({ gracePeriodDays: config.gracePeriodDays, penaltyPerDay: config.penaltyPerDay });
    }
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const onSubmit = (data: LateFeesConfigFormData) => {
    setIsSaving(true);
    setTimeout(() => {
      setConfig({ gracePeriodDays: data.gracePeriodDays, penaltyPerDay: data.penaltyPerDay });
      toast.success('💾 Late fee settings updated.');
      setEditing(false); 
      setIsSaving(false);
    }, 600);
  };

  const sendWhatsAppReminder = (s: SuperadminFinanceOverdueStudent) => {
    const lines = [
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📚 *SMART LIBRARY 360*`,
      `📍 Main Branch`,
      `━━━━ FEE OVERDUE ━━━━`,
      ``,
      `👤 *Name:* ${s.studentName}`,
      `🆔 *Smart ID:* ${s.smartId}`,
      ``,
      ` *Your fee is overdue by ${s.daysOverdue} days.*`,
      `📅 *Due Date:* ${s.dueDate}`,
      ``,
      `💰 *Late Fee Accrued:* ${formatCurrency(s.accruedFee)}`,
      `🔴 *Total Due Amount:* ${formatCurrency(s.totalDue)}`,
      ``,
      `Please clear your dues as soon as possible to avoid further late fees and suspension of seat access.`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `🎓 Keep studying hard!`,
      `📚 Smart Library 360`
    ];
    const message = lines.join('\n');
    openWhatsApp(s.phone, message);
  };

  const navigateToCollect = (studentId: string) => {
    router.push(`${SUPERADMIN_ROUTES.FINANCE_COLLECT_FEE}?studentId=${studentId}`);
  };

  return {
    config,
    overdue,
    isLoading,
    
    editing,
    isSaving,
    form,
    startEdit,
    cancelEdit,
    onSubmit: form.handleSubmit(onSubmit),
    
    sendWhatsAppReminder,
    navigateToCollect,
  };
}
