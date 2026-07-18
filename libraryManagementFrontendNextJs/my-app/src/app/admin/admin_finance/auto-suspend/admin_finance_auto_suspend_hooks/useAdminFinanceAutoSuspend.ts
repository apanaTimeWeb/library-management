// RESPONSIBILITY: Renders the useAdminFinanceAutoSuspend.ts component/hook.
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ADMIN_FINANCE_MOCK_CONFIG, ADMIN_FINANCE_MOCK_SUSPENDED } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { Config, SuspendedStudent } from "./useAdminFinanceAutoSuspend_types";

export function useAdminFinanceAutoSuspend() {
  const [config, setConfig] = useState<Config | null>(null);
  const [suspended, setSuspended] = useState<SuspendedStudent[]>([]);
  const [configLoading, setConfigLoading] = useState(true);
  const [suspendedLoading, setSuspendedLoading] = useState(true);
  
  const [editing, setEditing] = useState(false);
  const [days, setDays] = useState('');
  const [updatePending, setUpdatePending] = useState(false);
  
  const [restoreDialog, setRestoreDialog] = useState<{ id: number; name: string } | null>(null);
  const [restoreReason, setRestoreReason] = useState('');
  const [restorePending, setRestorePending] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => { 
      setConfig(ADMIN_FINANCE_MOCK_CONFIG); 
      setConfigLoading(false); 
    }, 500);
    const t2 = setTimeout(() => { 
      setSuspended(ADMIN_FINANCE_MOCK_SUSPENDED as SuspendedStudent[]); 
      setSuspendedLoading(false); 
    }, 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleSave = () => {
    if (!days || isNaN(parseInt(days))) return;
    setUpdatePending(true);
    setTimeout(() => {
      setConfig((prev) => prev ? { ...prev, daysBeforeSuspend: parseInt(days) } : prev);
      toast.success('💾 Auto-suspend settings updated.');
      setEditing(false); 
      setUpdatePending(false);
    }, 600);
  };

  const handleRestore = () => {
    if (!restoreDialog || !restoreReason.trim()) return;
    setRestorePending(true);
    setTimeout(() => {
      setSuspended((prev) => prev.filter((s) => s.studentId !== restoreDialog.id));
      setConfig((prev) => prev ? { 
        ...prev, 
        currentlySuspended: Math.max(0, prev.currentlySuspended - 1), 
        manualRestores: prev.manualRestores + 1 
      } : prev);
      toast.success(`✅ ${restoreDialog.name} restored to active.`);
      setRestoreDialog(null); 
      setRestoreReason(''); 
      setRestorePending(false);
    }, 700);
  };

  return {
    config,
    suspended,
    configLoading,
    suspendedLoading,
    editing,
    setEditing,
    days,
    setDays,
    updatePending,
    restoreDialog,
    setRestoreDialog,
    restoreReason,
    setRestoreReason,
    restorePending,
    handleSave,
    handleRestore
  };
}
