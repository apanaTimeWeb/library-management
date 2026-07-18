// RESPONSIBILITY: Renders the useAdminFinanceLateFees.ts component/hook.
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { ADMIN_FINANCE_MOCK_LATE_FEES_CONFIG, ADMIN_FINANCE_MOCK_LATE_FEES_OVERDUE } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';


export type Config = { gracePeriodDays: number; penaltyPerDay: number };
export type OverdueStudent = {
  studentId: string;
  studentName: string;
  smartId: string;
  phone: string;
  dueDate: string;
  daysOverdue: number;
  accruedFee: number;
  totalDue: number;
};

export function useAdminFinanceLateFees() {
  const [config, setConfig] = useState<Config | null>(null);
  const [overdue, setOverdue] = useState<OverdueStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [editing, setEditing] = useState(false);
  const [graceDays, setGraceDays] = useState('');
  const [penaltyRate, setPenaltyRate] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { 
      setConfig(ADMIN_FINANCE_MOCK_LATE_FEES_CONFIG); 
      setOverdue(ADMIN_FINANCE_MOCK_LATE_FEES_OVERDUE); 
      setIsLoading(false); 
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const startEdit = () => {
    if (config) { 
      setGraceDays(String(config.gracePeriodDays)); 
      setPenaltyRate(String(config.penaltyPerDay)); 
    }
    setEditing(true);
  };

  const handleSave = () => {
    if (!graceDays || !penaltyRate) return;
    setIsSaving(true);
    setTimeout(() => {
      setConfig({ gracePeriodDays: parseInt(graceDays), penaltyPerDay: parseFloat(penaltyRate) });
      toast.success('💾 Late fee settings updated.');
      setEditing(false); 
      setIsSaving(false);
    }, 600);
  };

  const sendWhatsAppReminder = (s: OverdueStudent) => {
    const lines = [
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📚 *SMART LIBRARY 360*`,
      `📍 Main Branch`,
      `━━━━ FEE OVERDUE ━━━━`,
      ``,
      `👤 *Name:* ${s.studentName}`,
      `🆔 *Smart ID:* ${s.smartId}`,
      ``,
      `⚠️ *Your fee is overdue by ${s.daysOverdue} days.*`,
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

  return {
    config,
    overdue,
    isLoading,
    editing,
    setEditing,
    graceDays,
    setGraceDays,
    penaltyRate,
    setPenaltyRate,
    isSaving,
    startEdit,
    handleSave,
    sendWhatsAppReminder
  };
}
