// RESPONSIBILITY: Renders the useAdminFinanceReceipt.ts component/hook.
import { useState, useMemo } from 'react';
import { formatCurrency, formatDate } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';
import { ADMIN_FINANCE_MOCK_RECEIPTS } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { FilterMode } from "./useAdminFinanceReceipt_types";

export function useAdminFinanceReceipt() {
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState<FilterMode>('all');

  const filteredReceipts = useMemo(() => {
    return ADMIN_FINANCE_MOCK_RECEIPTS.filter(r => {
      const matchSearch = !search || 
        r.studentName.toLowerCase().includes(search.toLowerCase()) ||
        r.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
        r.studentId.toLowerCase().includes(search.toLowerCase());
      const matchMode = modeFilter === 'all' || r.paymentMode.toLowerCase() === modeFilter;
      return matchSearch && matchMode;
    });
  }, [search, modeFilter]);

  const kpiData = useMemo(() => {
    return {
      totalReceipts: ADMIN_FINANCE_MOCK_RECEIPTS.length,
      totalCollected: ADMIN_FINANCE_MOCK_RECEIPTS.reduce((s, r) => s + r.amount, 0),
      thisMonth: ADMIN_FINANCE_MOCK_RECEIPTS.filter(r => r.date.startsWith(new Date().toISOString().slice(0, 7))).length
    };
  }, []);

  function handleWhatsApp(r: typeof ADMIN_FINANCE_MOCK_RECEIPTS[0]) {
    const W = 42;
    const line = '─'.repeat(W);
    const c = (t: string) => ' '.repeat(Math.max(0, Math.floor((W - t.length) / 2))) + t;
    const row = (l: string, v: string) => l + ' '.repeat(Math.max(1, W - l.length - v.length)) + v;
    const msg = [
      c('★ SMART LIBRARY 360 ★'),
      c('Main Branch'),
      line,
      c('[ PAYMENT RECEIPT ]'),
      line,
      row('Receipt :', r.receiptNumber),
      row('Date    :', formatDate(r.date)),
      '',
      row('Name    :', r.studentName),
      row('Smart ID:', r.studentId),
      '',
      line,
      row('Plan    :', r.planName),
      line,
      row('PAID    :', `Rs.${r.amount.toLocaleString('en-IN')}`),
      row('Mode    :', r.paymentMode),
      '',
      c('✅ Payment Confirmed'),
      c('Thank You! Keep Studying 😊'),
      line,
    ].join('\n');
    openWhatsApp(r.phone, msg);
  }

  function handlePrint(r: typeof ADMIN_FINANCE_MOCK_RECEIPTS[0]) {
    printThermal({
      type: 'receipt', shopName: 'Smart Library 360', branch: 'Main Branch',
      studentName: r.studentName, smartId: r.studentId, phone: r.phone,
      shift: r.shift, seat: r.seat, plan: r.planName,
      billNumber: r.receiptNumber, date: formatDate(r.date),
      totalPayable: r.amount, amountPaid: r.amount, discount: 0,
      balance: 0, paymentMode: r.paymentMode,
    });
  }

  return {
    search,
    setSearch,
    modeFilter,
    setModeFilter,
    filteredReceipts,
    kpiData,
    handleWhatsApp,
    handlePrint
  };
}
