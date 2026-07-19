/**
 * RESPONSIBILITY: Logic and state management for the SuperadminReceiptIdClient component.
 */
import { useParams, useRouter } from 'next/navigation';
import { SUPERADMIN_FINANCE_MOCK_RECEIPT_DETAIL as RECEIPT_DATA } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';

export function useSuperadminReceiptIdClient() {
  const router = useRouter();
  const params = useParams();
  const receiptId = params.id as string;

  function handleWhatsApp() {
    const W = 42;
    const ln = '-'.repeat(W);
    const dln = '='.repeat(W);
    const c = (t: string) => ' '.repeat(Math.max(0, Math.floor((W - t.length) / 2))) + t;
    const r = (l: string, v: string) => l.slice(0,10).padEnd(10) + ' ' + v;

    const msg = [
      dln, c('SMART LIBRARY 360'), c('Main Branch'), dln,
      c('FEE RECEIPT'), ln,
      r('Receipt :', RECEIPT_DATA.receiptNo),
      r('Date    :', RECEIPT_DATA.date), ln,
      r('Name    :', RECEIPT_DATA.studentName),
      r('ID      :', RECEIPT_DATA.studentId),
      r('Phone   :', RECEIPT_DATA.phone), ln,
      r('Plan    :', RECEIPT_DATA.plan), ln,
      ...RECEIPT_DATA.items.map(( i ) => r(i.label.slice(0,9)+':', `Rs.${i.amount.toLocaleString('en-IN')}`)),
      dln,
      r('TOTAL   :', `Rs.${RECEIPT_DATA.total.toLocaleString('en-IN')}`),
      dln,
      r('Mode    :', RECEIPT_DATA.paymentMode),
      r('Txn ID  :', RECEIPT_DATA.txnId), '',
      c('Payment Received & Confirmed'),
      c('Thank You! Keep Studying!'),
      dln,
    ].join('\n');

    openWhatsApp(RECEIPT_DATA.phone, msg);
  }

  function handlePrint() {
    printThermal({
      type:         'receipt',
      shopName:     'Smart Library 360',
      branch:       'Main Branch',
      studentName:  RECEIPT_DATA.studentName,
      smartId:      RECEIPT_DATA.studentId,
      phone:        RECEIPT_DATA.phone,
      shift:        RECEIPT_DATA.shift,
      seat:         RECEIPT_DATA.seat,
      plan:         RECEIPT_DATA.plan,
      billNumber:   RECEIPT_DATA.receiptNo,
      date:         RECEIPT_DATA.date,
      totalPayable: RECEIPT_DATA.total,
      amountPaid:   RECEIPT_DATA.total,
      discount:     0,
      balance:      0,
      paymentMode:  RECEIPT_DATA.paymentMode,
      transactionId: RECEIPT_DATA.txnId,
    });
  }

  return {
    router,
    receiptId,
    receiptData: RECEIPT_DATA,
    handleWhatsApp,
    handlePrint,
  };
}
