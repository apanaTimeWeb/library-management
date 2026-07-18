/**
 * RESPONSIBILITY: Logic and state management for the InvoiceClient component.
 */
import { useState } from 'react';
import type { SuperadminFinanceInvoiceFilterStatus } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_INVOICES } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';
import { formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';

export function useInvoiceClient() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<SuperadminFinanceInvoiceFilterStatus>('all');

  const filtered = SUPERADMIN_FINANCE_MOCK_INVOICES.filter(inv => {
    const ms = !search || inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.studentId.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'all' || inv.paymentStatus === statusFilter;
    return ms && mst;
  });

  const totalInvoices = SUPERADMIN_FINANCE_MOCK_INVOICES.length.toString();
  const totalBilled = SUPERADMIN_FINANCE_MOCK_INVOICES.reduce((s, i) => s + i.grandTotal, 0);
  const pendingCount = SUPERADMIN_FINANCE_MOCK_INVOICES.filter(i => i.paymentStatus !== 'paid').length.toString();

  function handleWhatsApp(inv: typeof SUPERADMIN_FINANCE_MOCK_INVOICES[0]) {
    const W = 42;
    const line = '─'.repeat(W);
    const c = (t: string) => ' '.repeat(Math.max(0, Math.floor((W - t.length) / 2))) + t;
    const row = (l: string, v: string) => l + ' '.repeat(Math.max(1, W - l.length - v.length)) + v;
    const statusEmoji = inv.paymentStatus === 'paid' ? '' : inv.paymentStatus === 'pending' ? '' : '';
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

  function handlePrint(inv: typeof SUPERADMIN_FINANCE_MOCK_INVOICES[0]) {
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
    search, setSearch,
    statusFilter, setStatusFilter,
    filtered,
    totalInvoices, totalBilled, pendingCount,
    handleWhatsApp, handlePrint
  };
}
