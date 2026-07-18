// RESPONSIBILITY: Renders the useAdminFinanceCollectFee.ts component/hook.
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';
import { ADMIN_FINANCE_MOCK_STUDENTS, ADMIN_FINANCE_MODES } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';

export type Mode = typeof ADMIN_FINANCE_MODES[number];

export const MODE_LABELS: Record<Mode, string> = { 
  cash: 'Cash', 
  upi: 'UPI', 
  card: 'Card', 
  bank: 'Bank Transfer' 
};

let receiptCounter = 124;

export function maskPhone(phone: string): string {
  const d = phone.replace(/\D/g, '').slice(-10);
  return `${d.slice(0, 2)}****${d.slice(6)}`;
}

function buildWhatsAppReceipt(params: {
  receiptNo: string; 
  student: typeof ADMIN_FINANCE_MOCK_STUDENTS[0];
  amount: number; 
  mode: Mode; 
  txnId: string;
  lateFee: number; 
  couponDiscount: number; 
  total: number;
  remark: string; 
  date: string;
}): string {
  const { receiptNo, student, amount, mode, txnId, lateFee, couponDiscount, total, remark, date } = params;
  const W = 42;
  const line = '─'.repeat(W);
  const c = (t: string) => ' '.repeat(Math.max(0, Math.floor((W - t.length) / 2))) + t;
  const r = (l: string, v: string) => l + ' '.repeat(Math.max(1, W - l.length - v.length)) + v;

  const lines = [
    c('★ SMART LIBRARY 360 ★'),
    c('Main Branch'),
    line,
    c('[ FEE RECEIPT ]'),
    line,
    r('Receipt :', receiptNo),
    r('Date    :', date),
    '',
    r('Name    :', student.name),
    r('Smart ID:', '#' + student.smartId),
    r('Phone   :', student.phone),
    '',
    line,
    r('Plan    :', student.plan),
    r('Shift   :', student.shift),
    r('Seat    :', student.seat),
    line,
    r('Base Amt:', `Rs.${amount.toLocaleString('en-IN')}`),
    ...(lateFee > 0 ? [r('Late Fee:', `Rs.${lateFee.toLocaleString('en-IN')}`)] : []),
    ...(couponDiscount > 0 ? [r('Discount:', `-Rs.${couponDiscount.toLocaleString('en-IN')}`)] : []),
    r('PAID    :', `Rs.${total.toLocaleString('en-IN')}`),
    line,
    r('Mode    :', MODE_LABELS[mode]),
    ...(txnId ? [r('Txn ID  :', txnId)] : []),
    '',
    ...(remark ? [`Note    : ${remark}`, ''] : []),
    c('✅ Payment Received & Confirmed'),
    c('Thank You! Keep Studying 😊'),
    line,
    c('Smart Library 360'),
  ];
  return lines.join('\n');
}

export interface ReceiptData {
  receiptNo: string; 
  studentName: string; 
  studentId: string;
  phone: string; 
  total: number; 
  mode: Mode; 
  date: string; 
  waMessage: string;
  student: typeof ADMIN_FINANCE_MOCK_STUDENTS[0]; 
  amount: number; 
  lateFee: number;
  couponDiscount: number; 
  txnId: string; 
  remark: string;
}

export function useAdminFinanceCollectFee() {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof ADMIN_FINANCE_MOCK_STUDENTS[0] | null>(null);
  
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<Mode>('cash');
  const [txnId, setTxnId] = useState('');
  
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  
  const [lateFee, setLateFee] = useState('0');
  const [lateFeeOverride, setLateFeeOverride] = useState(false);
  const [remark, setRemark] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const filteredStudents = useMemo(() => {
    return search
      ? ADMIN_FINANCE_MOCK_STUDENTS.filter(
          (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.smartId.toLowerCase().includes(search.toLowerCase())
        )
      : [];
  }, [search]);

  const baseAmount = parseFloat(amount) || 0;
  const lateFeeAmt = parseFloat(lateFee) || 0;
  const total = baseAmount + lateFeeAmt - couponDiscount;

  function resetForm() {
    setSelectedStudent(null); 
    setSearch(''); 
    setAmount(''); 
    setTxnId('');
    setCouponCode(''); 
    setCouponDiscount(0); 
    setCouponStatus('idle');
    setLateFee('0'); 
    setLateFeeOverride(false); 
    setRemark(''); 
    setIsSubmitting(false);
  }

  function handleStudentSelect(s: typeof ADMIN_FINANCE_MOCK_STUDENTS[0]) {
    setSelectedStudent(s); 
    setSearch(s.name); 
    setShowDropdown(false);
    if (s.dueAmount > 0) { 
      setLateFee('50'); 
      setAmount(s.dueAmount.toString()); 
    } else { 
      setLateFee('0'); 
      setAmount(''); 
    }
  }

  function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'SAVE50') { 
      setCouponDiscount(50);  
      setCouponStatus('valid');   
      toast.success('₹50 discount applied'); 
    } else if (couponCode.toUpperCase() === 'FRIEND100') { 
      setCouponDiscount(100); 
      setCouponStatus('valid');   
      toast.success('₹100 discount applied'); 
    } else { 
      setCouponDiscount(0);   
      setCouponStatus('invalid'); 
      toast.error('Invalid/expired code'); 
    }
  }

  function handleCollect() {
    if (!selectedStudent || !amount || parseFloat(amount) <= 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const rn = `REC-${receiptCounter++}`;
      const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const waMsg = buildWhatsAppReceipt({ 
        receiptNo: rn, student: selectedStudent, amount: baseAmount, 
        mode, txnId, lateFee: lateFeeAmt, couponDiscount, total, remark, date 
      });

      setReceiptData({ 
        receiptNo: rn, studentName: selectedStudent.name, studentId: selectedStudent.smartId, 
        phone: selectedStudent.phone, total, mode, date, waMessage: waMsg, student: selectedStudent, 
        amount: baseAmount, lateFee: lateFeeAmt, couponDiscount, txnId, remark 
      });

      if (selectedStudent.status === 'suspended') {
        setTimeout(() => toast.success('🔓 Seat access automatically restored.'), 500);
      }
      resetForm();
    }, 900);
  }

  function handlePrintReceipt() {
    if (!receiptData) return;
    printThermal({
      type: 'receipt', shopName: 'Smart Library 360', branch: 'Main Branch',
      studentName: receiptData.studentName, smartId: receiptData.studentId,
      phone: receiptData.phone, shift: receiptData.student.shift,
      seat: receiptData.student.seat, plan: receiptData.student.plan,
      billNumber: receiptData.receiptNo, date: receiptData.date,
      totalPayable: receiptData.amount + receiptData.lateFee,
      amountPaid: receiptData.total, discount: receiptData.couponDiscount,
      balance: 0, paymentMode: MODE_LABELS[receiptData.mode],
      transactionId: receiptData.txnId || undefined,
    });
  }

  return {
    search,
    setSearch,
    showDropdown,
    setShowDropdown,
    selectedStudent,
    amount,
    setAmount,
    mode,
    setMode,
    txnId,
    setTxnId,
    couponCode,
    setCouponCode,
    couponDiscount,
    couponStatus,
    lateFee,
    setLateFee,
    lateFeeOverride,
    setLateFeeOverride,
    remark,
    setRemark,
    isSubmitting,
    receiptData,
    setReceiptData,
    filteredStudents,
    total,
    baseAmount,
    lateFeeAmt,
    resetForm,
    handleStudentSelect,
    handleApplyCoupon,
    handleCollect,
    handlePrintReceipt
  };
}
