/**
 * RESPONSIBILITY: Logic and state management for the SuperadminAutoSuspendClient component.
 */
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import type { SuperadminFinanceAutoSuspendConfig, SuperadminFinanceSuspendedStudent, SuperadminFinanceDialogState } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_CONFIG_AUTO_SUSPEND, SUPERADMIN_FINANCE_MOCK_SUSPENDED_STUDENTS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';


export type AutoSuspendConfigFormData = z.infer<typeof autoSuspendConfigSchema>;
export type ManualRestoreFormData = z.infer<typeof manualRestoreSchema>;

export const autoSuspendConfigSchema = z.object({
  daysBeforeSuspend: z.number().min(1, 'Must be at least 1 day'),
});

export const manualRestoreSchema = z.object({
  restoreReason: z.string().min(5, 'Please provide a valid reason (min 5 chars)'),
});

export function useSuperadminAutoSuspendClient() {
  const [config, setConfig] = useState<SuperadminFinanceAutoSuspendConfig | null>(null);
  const [suspended, setSuspended] = useState<SuperadminFinanceSuspendedStudent[]>([]);
  const [configLoading, setConfigLoading] = useState(true);
  const [suspendedLoading, setSuspendedLoading] = useState(true);
  
  const [editing, setEditing] = useState(false);
  const [updatePending, setUpdatePending] = useState(false);
  
  const [restoreDialog, setRestoreDialog] = useState<SuperadminFinanceDialogState | null>(null);
  const [restorePending, setRestorePending] = useState(false);

  const configForm = useForm<AutoSuspendConfigFormData>({
    resolver: zodResolver(autoSuspendConfigSchema),
    defaultValues: { daysBeforeSuspend: 1 },
    mode: 'onTouched',
  });

  const restoreForm = useForm<ManualRestoreFormData>({
    resolver: zodResolver(manualRestoreSchema),
    defaultValues: { restoreReason: '' },
    mode: 'onTouched',
  });

  useEffect(() => {
    const t1 = setTimeout(() => { 
      setConfig(SUPERADMIN_FINANCE_MOCK_CONFIG_AUTO_SUSPEND); 
      configForm.reset({ daysBeforeSuspend: SUPERADMIN_FINANCE_MOCK_CONFIG_AUTO_SUSPEND.daysBeforeSuspend });
      setConfigLoading(false); 
    }, 500);
    
    const t2 = setTimeout(() => { 
      setSuspended(SUPERADMIN_FINANCE_MOCK_SUSPENDED_STUDENTS); 
      setSuspendedLoading(false); 
    }, 700);
    
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [configForm]);

  const onSaveConfig = (data: AutoSuspendConfigFormData) => {
    setUpdatePending(true);
    setTimeout(() => {
      setConfig((prev) => prev ? { ...prev, daysBeforeSuspend: data.daysBeforeSuspend } : prev);
      toast.success('💾 Auto-suspend settings updated.');
      setEditing(false); 
      setUpdatePending(false);
    }, 600);
  };

  const onRestoreStudent = (data: ManualRestoreFormData) => {
    if (!restoreDialog) return;
    setRestorePending(true);
    setTimeout(() => {
      setSuspended((prev) => prev.filter((s) => s.studentId !== restoreDialog.id));
      setConfig((prev) => prev ? { ...prev, currentlySuspended: Math.max(0, prev.currentlySuspended - 1), manualRestores: prev.manualRestores + 1 } : prev);
      toast.success(`${restoreDialog.name} restored to active.`);
      setRestoreDialog(null); 
      restoreForm.reset();
      setRestorePending(false);
    }, 700);
  };

  const openEditConfig = () => {
    if (config) configForm.reset({ daysBeforeSuspend: config.daysBeforeSuspend });
    setEditing(true);
  };

  const cancelEditConfig = () => {
    setEditing(false);
  };

  const openRestoreDialog = (student: SuperadminFinanceSuspendedStudent) => {
    setRestoreDialog({ id: student.studentId, name: student.studentName });
    restoreForm.reset();
  };

  const sendReminder = (studentName: string) => {
    toast.success(`📱 WhatsApp reminder sent to ${studentName}.`);
  };

  return {
    config,
    suspended,
    configLoading,
    suspendedLoading,
    
    editing,
    updatePending,
    configForm,
    onSaveConfig: configForm.handleSubmit(onSaveConfig),
    openEditConfig,
    cancelEditConfig,
    
    restoreDialog,
    setRestoreDialog,
    restorePending,
    restoreForm,
    onRestoreStudent: restoreForm.handleSubmit(onRestoreStudent),
    openRestoreDialog,
    sendReminder,
  };
}
