/**
 * RESPONSIBILITY: Logic and state management for the SuperadminInvoiceIdClient component.
 */
import { useRouter } from 'next/navigation';
import { formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/SuperadminFormat';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';

import { SUPERADMIN_FINANCE_MOCK_INVOICE_DETAIL as INV } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

export function useSuperadminInvoiceIdClient() {
  const router = useRouter();

  function handleWhatsApp() {
    const W = 42;
    const ln = '-'.repeat(W);
    const dln = '='.repeat(W);
    const c = (t: string) => ' '.repeat(Math.max(0, Math.floor((W - t.length) / 2))) + t;
    const r = (l: string, v: string) => l.slice(0, 10).padEnd(10) + ' ' + v;

    const msg = [
      dln, c('SMART LIBRARY 360'), c('Main Branch'), dln,
      c('TAX INVOICE'), ln,
      r('Invoice :', INV.invoiceNumber),
      r('Date    :', formatDate(INV.invoiceDate)), ln,
      r('Name    :', INV.studentName),
      r('Smart ID:', INV.studentSmartId), ln,
      ...INV.items.map(( i: typeof INV.items[0] ) => r(i.description.slice(0, 9) + ':', `Rs.${i.amount.toLocaleString('en-IN')}`)),
      r('GST     :', `Rs.${INV.totalGst.toLocaleString('en-IN')}`),
      dln,
      r('TOTAL   :', `Rs.${INV.grandTotal.toLocaleString('en-IN')}`),
      dln,
      r('Mode    :', INV.paymentMode),
      r('Txn ID  :', INV.paymentTransactionId),
      r('Status  :', INV.paymentStatus.toUpperCase()), '',
      c('Thank You for choosing'),
      c('Smart Library 360'),
      dln,
    ].join('\n');

    openWhatsApp(INV.studentPhone, msg);
  }

  function handlePrint() {
    printThermal({
      type:         'receipt',
      shopName:     INV.libraryName,
      branch:       'Main Branch',
      studentName:  INV.studentName,
      smartId:      INV.studentSmartId,
      phone:        INV.studentPhone,
      shift:        INV.shift,
      seat:         INV.seat,
      plan:         INV.items[0].description,
      billNumber:   INV.invoiceNumber,
      date:         formatDate(INV.invoiceDate),
      totalPayable: INV.grandTotal,
      amountPaid:   INV.paymentStatus === 'paid' ? INV.grandTotal : 0,
      discount:     0,
      balance:      INV.paymentStatus === 'paid' ? 0 : INV.grandTotal,
      paymentMode:  INV.paymentMode,
      transactionId: INV.paymentTransactionId,
    });
  }

  return {
    router,
    invoiceData: INV,
    handleWhatsApp,
    handlePrint,
  };
}
