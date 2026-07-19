/**
 * RESPONSIBILITY: Logic and state management for the SuperadminReceiptClient component.
 */
import { useState } from 'react';
import type { SuperadminFinanceReceiptFilterMode } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_RECEIPTS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';
import { formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/SuperadminFormat';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';

export function useSuperadminReceiptClient() {
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState<SuperadminFinanceReceiptFilterMode>('all');

  const filtered = SUPERADMIN_FINANCE_MOCK_RECEIPTS.filter(r => {
    const ms = !search || r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.studentId.toLowerCase().includes(search.toLowerCase());
    const mm = modeFilter === 'all' || r.paymentMode.toLowerCase() === modeFilter;
    return ms && mm;
  });

  const totalCollected = SUPERADMIN_FINANCE_MOCK_RECEIPTS.reduce((s, r) => s + r.amount, 0);
  const totalReceipts = SUPERADMIN_FINANCE_MOCK_RECEIPTS.length.toString();
  const thisMonthCount = SUPERADMIN_FINANCE_MOCK_RECEIPTS.filter(r => r.date.startsWith(new Date().toISOString().slice(0, 7))).length.toString();

  function handleWhatsApp(r: typeof SUPERADMIN_FINANCE_MOCK_RECEIPTS[0]) {
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
      c('Payment Confirmed'),
      c('Thank You! Keep Studying 😊'),
      line,
    ].join('\n');
    openWhatsApp(r.phone, msg);
  }

  function handlePrint(r: typeof SUPERADMIN_FINANCE_MOCK_RECEIPTS[0]) {
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
    search, setSearch,
    modeFilter, setModeFilter,
    filtered,
    totalCollected, totalReceipts, thisMonthCount,
    handleWhatsApp, handlePrint,
  };
}
