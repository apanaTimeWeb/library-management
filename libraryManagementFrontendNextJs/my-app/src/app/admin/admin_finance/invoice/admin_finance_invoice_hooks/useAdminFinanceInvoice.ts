import { useUrlState } from '@/app/admin/admin_shared_hooks/useUrlState';
// RESPONSIBILITY: Renders the useAdminFinanceInvoice.ts component/hook.
import { useState, useMemo } from 'react';
import { formatCurrency, formatDate } from '@/app/admin/admin_finance/admin_finance_utils/AdminFinanceFormat';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';
import { ADMIN_FINANCE_MOCK_INVOICES } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';


export type FilterStatus = 'all' | 'paid' | 'pending' | 'overdue';

export function useAdminFinanceInvoice() {
  const [search, setSearch] = useUrlState('search', '');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');

  const filteredInvoices = useMemo(() => {
    return ADMIN_FINANCE_MOCK_INVOICES.filter(inv => {
      const matchSearch = !search || 
        inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
        inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        inv.studentId.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || inv.paymentStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const kpiData = useMemo(() => {
    return {
      totalInvoices: ADMIN_FINANCE_MOCK_INVOICES.length,
      totalBilled: ADMIN_FINANCE_MOCK_INVOICES.reduce((s, i) => s + i.grandTotal, 0),
      pendingOrOverdue: ADMIN_FINANCE_MOCK_INVOICES.filter(i => i.paymentStatus !== 'paid').length
    };
  }, []);

  function handleWhatsApp(inv: typeof ADMIN_FINANCE_MOCK_INVOICES[0]) {
    const W = 42;
    const line = '─'.repeat(W);
    const c = (t: string) => ' '.repeat(Math.max(0, Math.floor((W - t.length) / 2))) + t;
    const row = (l: string, v: string) => l + ' '.repeat(Math.max(1, W - l.length - v.length)) + v;
    const statusEmoji = inv.paymentStatus === 'paid' ? '✅' : inv.paymentStatus === 'pending' ? '⏳' : '⚠️';
    const msg = [
      c('★ SMART LIBRARY 360 ★'),
      c('Main Branch'),
      line,
      c('[ TAX INVOICE ]'),
      line,
      row('Invoice :', inv.invoiceNumber),
      row('Date    :', formatDate(inv.invoiceDate)),
      '',
      row('Name    :', inv.studentName),
      row('Smart ID:', inv.studentId),
      '',
      line,
      row('Plan    :', inv.planName),
      row('Amount  :', `Rs.${inv.grandTotal.toLocaleString('en-IN')}`),
      ...(inv.paymentMode ? [row('Mode    :', inv.paymentMode)] : []),
      line,
      row('Status  :', `${statusEmoji} ${inv.paymentStatus.toUpperCase()}`),
      '',
      c('Smart Library 360 | Main Branch'),
      line,
    ].join('\n');
    openWhatsApp(inv.phone, msg);
  }

  function handlePrint(inv: typeof ADMIN_FINANCE_MOCK_INVOICES[0]) {
    printThermal({
      type: 'receipt', shopName: 'Smart Library 360', branch: 'Main Branch',
      studentName: inv.studentName, smartId: inv.studentId, phone: inv.phone,
      shift: inv.shift, seat: inv.seat, plan: inv.planName,
      billNumber: inv.invoiceNumber, date: formatDate(inv.invoiceDate),
      totalPayable: inv.grandTotal,
      amountPaid: inv.paymentStatus === 'paid' ? inv.grandTotal : 0,
      discount: 0, balance: inv.paymentStatus === 'paid' ? 0 : inv.grandTotal,
      paymentMode: inv.paymentMode || 'Pending',
    });
  }

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredInvoices,
    kpiData,
    handleWhatsApp,
    handlePrint
  };
}
