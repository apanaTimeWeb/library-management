/**
 * RESPONSIBILITY: Logic and form management for the SuperadminCollectFeeClient component.
 * DATA FLOW: Form Interaction -> useSuperadminCollectFeeClient -> SuperadminCollectFeeReceiptModal
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import type { SuperadminFinanceCollectFeeMode, SuperadminFinanceReceiptData } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_STUDENTS_COLLECT_FEE } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';


export type CollectFeeFormData = z.infer<typeof collectFeeSchema>;

const MODE_LABELS: Record<SuperadminFinanceCollectFeeMode, string> = { cash: 'Cash', upi: 'UPI', card: 'Card', bank: 'Bank Transfer' };
let receiptCounter = 124;

export const collectFeeSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  mode: z.enum(['cash', 'upi', 'card', 'bank'] as const),
  txnId: z.string().optional(),
  couponCode: z.string().optional(),
  lateFee: z.number().min(0, 'Cannot be negative'),
  lateFeeOverride: z.boolean().optional(),
  remark: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.mode !== 'cash' && (!data.txnId || data.txnId.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Transaction ID is required for non-cash modes',
      path: ['txnId'],
    });
  }
});

function buildWhatsAppReceipt(params: {
  receiptNo: string; student: typeof SUPERADMIN_FINANCE_MOCK_STUDENTS_COLLECT_FEE[0];
  amount: number; mode: SuperadminFinanceCollectFeeMode; txnId?: string;
  lateFee: number; couponDiscount: number; total: number;
  remark?: string; date: string;
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
    c('Payment Received & Confirmed'),
    c('Thank You! Keep Studying 😊'),
    line,
    c('Smart Library 360'),
  ];
  return lines.join('\n');
}

export function useSuperadminCollectFeeClient() {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof SUPERADMIN_FINANCE_MOCK_STUDENTS_COLLECT_FEE[0] | null>(null);
  
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<SuperadminFinanceReceiptData | null>(null);

  const form = useForm<CollectFeeFormData>({
    resolver: zodResolver(collectFeeSchema),
    defaultValues: {
      amount: undefined,
      mode: 'cash',
      txnId: '',
      couponCode: '',
      lateFee: 0,
      lateFeeOverride: false,
      remark: '',
    },
    mode: 'onTouched',
  });

  const { watch, setValue, reset, getValues } = form;
  const currentMode = watch('mode');
  const currentAmount = watch('amount') || 0;
  const currentLateFee = watch('lateFee') || 0;
  const lateFeeOverride = watch('lateFeeOverride');
  const currentCouponCode = watch('couponCode');

  const filteredStudents = SUPERADMIN_FINANCE_MOCK_STUDENTS_COLLECT_FEE.filter(s =>
    search.length >= 2 &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.smartId.toLowerCase().includes(search.toLowerCase()))
  );

  const total = currentAmount + currentLateFee - couponDiscount;

  function resetForm() {
    setSelectedStudent(null);
    setSearch('');
    setCouponDiscount(0);
    setCouponStatus('idle');
    setIsSubmitting(false);
    reset({
      amount: undefined,
      mode: 'cash',
      txnId: '',
      couponCode: '',
      lateFee: 0,
      lateFeeOverride: false,
      remark: '',
    });
  }

  function handleSelectStudent(s: typeof SUPERADMIN_FINANCE_MOCK_STUDENTS_COLLECT_FEE[0] | null) {
    setSelectedStudent(s);
    if (s) {
      setSearch(s.name);
      if (s.dueAmount > 0) {
        setValue('lateFee', 50, { shouldValidate: true });
        setValue('lateFeeOverride', false);
        setValue('amount', s.dueAmount, { shouldValidate: true });
      } else {
        setValue('lateFee', 0);
        setValue('amount', undefined as any);
      }
    }
    setShowDropdown(false);
  }

  function handleApplyCoupon() {
    if (!currentCouponCode || !currentCouponCode.trim()) return;
    if (currentCouponCode.toUpperCase() === 'SAVE50') { 
      setCouponDiscount(50); setCouponStatus('valid'); toast.success('₹50 discount applied'); 
    }
    else if (currentCouponCode.toUpperCase() === 'FRIEND100') { 
      setCouponDiscount(100); setCouponStatus('valid'); toast.success('₹100 discount applied'); 
    }
    else { 
      setCouponDiscount(0); setCouponStatus('invalid'); toast.error('Invalid/expired code'); 
    }
  }

  const onSubmit = async (data: CollectFeeFormData) => {
    if (!selectedStudent || data.amount <= 0) return;
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      const rn = `REC-${receiptCounter++}`;
      const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      
      const waMsg = buildWhatsAppReceipt({ 
        receiptNo: rn, student: selectedStudent, amount: data.amount, 
        mode: data.mode, txnId: data.txnId, lateFee: data.lateFee, 
        couponDiscount, total, remark: data.remark, date 
      });

      setReceiptData({ 
        receiptNo: rn, studentName: selectedStudent.name, studentId: selectedStudent.smartId, 
        phone: selectedStudent.phone, total, mode: data.mode, date, waMessage: waMsg, 
        student: selectedStudent, amount: data.amount, lateFee: data.lateFee, 
        couponDiscount, txnId: data.txnId || '', remark: data.remark || '' 
      });

      if (selectedStudent.status === 'suspended') {
        setTimeout(() => toast.success('🔓 Seat access automatically restored.'), 500);
      }
      resetForm();
    }, 900);
  };

  return {
    form,
    search,
    setSearch,
    showDropdown,
    setShowDropdown,
    selectedStudent,
    filteredStudents,
    handleSelectStudent,
    couponStatus,
    setCouponStatus,
    couponDiscount,
    setCouponDiscount,
    handleApplyCoupon,
    isSubmitting,
    receiptData,
    setReceiptData,
    total,
    currentMode,
    lateFeeOverride,
    onSubmit: form.handleSubmit(onSubmit as any),
    resetForm,
  };
}
