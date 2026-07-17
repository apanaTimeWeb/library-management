import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { calcExpiryDate, formatDateIN } from '@/lib/whatsappUtils';
import type { IdCardData } from '@/app/manager/manager_students/manager_students_types';
import { createStudent } from '@/app/manager/manager_students/manager_students_api/manager_students_api';
import { PLANS, SHIFTS, SEATS } from '@/app/manager/manager_students/manager_students_constants';

// DATA FLOW: Form -> useManagerStudentsAdmissionForm -> API
// RESPONSIBILITY: Handles all state, form validation, and API submission for new student admission.

const schema = z.object({
  fullName:      z.string().min(2, 'Full name is required'),
  phone:         z.string().min(10, 'Valid phone number required'),
  parentPhone:   z.string().optional(),
  email:         z.string().email('Valid email required').optional().or(z.literal('')),
  college:       z.string().optional(),
  shift:         z.string().min(1, 'Select a shift'),
  seat:          z.string().min(1, 'Select a seat'),
  plan:          z.string().min(1, 'Select a plan'),
  manualDiscount:z.string().optional(),
  amountPaid:    z.string().optional(),
  paymentMode:   z.enum(['Cash', 'UPI', 'Card', 'Bank Transfer']),
  transactionId: z.string().optional(),
});

export type FormValues = z.infer<typeof schema>;

const SMART_ID = 'LIB003'; // simulated auto-generated

import { AdmittedData } from '@/app/manager/manager_students/manager_students_types';

export function useManagerStudentsAdmissionForm() {
  const searchParams = useSearchParams();
  const [admittedData, setAdmittedData] = useState<AdmittedData | null>(null);

  const defaultName = searchParams.get('name') || '';
  const defaultPhone = searchParams.get('phone') || '';

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName:      defaultName,
      phone:         defaultPhone,
      shift:         SHIFTS[0],
      seat:          SEATS[0],
      plan:          'Monthly',
      paymentMode:   'UPI',
      manualDiscount:'0',
      amountPaid:    '1500',
    },
  });

  const watchedPlan      = watch('plan');
  const watchedDiscount  = watch('manualDiscount');
  const watchedAmount    = watch('amountPaid');
  const watchedMode      = watch('paymentMode');
  const watchedShift     = watch('shift');
  const watchedSeat      = watch('seat');

  const planMeta  = PLANS.find(p => p.value === watchedPlan);
  const baseAmt   = planMeta?.amount ?? 1500;
  const discount  = Number(watchedDiscount) || 0;
  const totalPayable = baseAmt - discount;

  async function onSubmit(data: FormValues) {
    try {
      const joinDate = new Date();
      const expiryDate = calcExpiryDate(joinDate, data.plan);
      
      const payload = {
        ...data,
        manualDiscount: discount,
        amountPaid: Number(data.amountPaid || 0),
      };

      const res = await createStudent(payload) as { smartId?: string };

      const admitted: AdmittedData = {
        name:          data.fullName,
        smartId:       res.smartId || SMART_ID,
        phone:         data.phone,
        parentPhone:   data.parentPhone,
        shift:         data.shift,
        seat:          data.seat,
        locker:        'None',
        plan:          data.plan,
        joinDate:      formatDateIN(joinDate),
        expiryDate:    formatDateIN(expiryDate),
        branch:        'Main Branch',
        college:       data.college,
        amountPaid:    Number(data.amountPaid || 0),
        totalPayable,
        discount:      Number(discount),
        paymentMode:   data.paymentMode,
        transactionId: data.transactionId,
      };

      setAdmittedData(admitted);
      toast.success('🎉 Admission confirmed! ID Card ready.', { duration: 3000 });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit admission');
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    setValue,
    admittedData,
    setAdmittedData,
    watchedPlan,
    watchedShift,
    watchedSeat,
    watchedAmount,
    watchedMode,
    baseAmt,
    discount,
    totalPayable,
    SMART_ID
  };
}
