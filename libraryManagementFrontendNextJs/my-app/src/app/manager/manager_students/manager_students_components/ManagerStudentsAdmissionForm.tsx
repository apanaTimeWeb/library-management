'use client';
// RESPONSIBILITY: Renders the ManagerStudentsAdmissionForm.tsx component.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import {
  ArrowLeft, CheckCircle, User, Phone, Mail, GraduationCap,
  Armchair, Lock, FileText, IndianRupee, CreditCard,
} from 'lucide-react';
import ManagerStudentsAdmissionSuccessModal from '@/app/manager/manager_students/manager_students_components/ManagerStudentsAdmissionSuccessModal';
import { useManagerStudentsAdmissionForm } from '@/app/manager/manager_students/manager_students_hooks/useManagerStudentsAdmissionForm';
import { PLANS, SHIFTS, SEATS } from '@/app/manager/manager_students/manager_students_constants';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
import { ManagerStudentsAdmissionFormSummary } from './ManagerStudentsAdmissionFormSummary';
export default function ManagerStudentsAdmissionForm() {
  const {
    register,
    handleSubmit,
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
  } = useManagerStudentsAdmissionForm();

  return (
    <>
      {/* Success Modal â€” shows after admission confirmed */}
      {admittedData && (
        <ManagerStudentsAdmissionSuccessModal
          data={admittedData}
          onClose={() => setAdmittedData(null)}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            fontSize: 13,
          },
        }}
      />

      <div className="p-6 min-h-screen">

        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link href={MANAGER_ROUTES.STUDENTS} className="flex items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-primary transition-colors mb-4 inline-flex">
              <ArrowLeft size={14} /> Back to Students
            </Link>
            <h1 className="text-[22px] font-bold text-text-primary">New Student Admission</h1>
            <p className="text-[13px] text-text-secondary mt-1.5">Fill all mandatory (*) fields accurately. Smart ID is auto-generated.</p>
          </div>
          {/* Smart ID Badge */}
          <div className="flex items-center gap-3 bg-primary-subtle/50 px-4 py-2.5 rounded-xl border border-primary/10">
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Smart ID</span>
            <span className="font-mono text-base font-bold text-primary tracking-tight">{SMART_ID}</span>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-info/10 text-info">Gap slot reused</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col lg:flex-row gap-8">

            {/* â”€â”€ LEFT: Form Sections â”€â”€ */}
            <div className="flex-1 space-y-8">

              {/* Section 1: Personal Info */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-6 h-6 rounded-md bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold">01</div>
                  <h2 className="text-base font-semibold text-text-primary">Personal Information</h2>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                    <div className="flex flex-col col-span-1 md:col-span-2">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5 after:content-['*'] after:ml-1 after:text-danger">Full Name</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                          {...register('fullName')}
                          className={`w-full bg-input border ${errors.fullName ? 'border-danger focus:ring-danger' : 'border-border focus:ring-primary'} rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2`}
                          placeholder="Enter student full name"
                        />
                      </div>
                      {errors.fullName && <p className="text-[11px] text-danger mt-1.5 font-medium">{errors.fullName.message}</p>}
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5 after:content-['*'] after:ml-1 after:text-danger">Phone Number</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                          {...register('phone')}
                          type="tel"
                          className={`w-full bg-input border ${errors.phone ? 'border-danger focus:ring-danger' : 'border-border focus:ring-primary'} rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2`}
                          placeholder="9876543210"
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-danger mt-1.5 font-medium">{errors.phone.message}</p>}
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Parent / Guardian Phone</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                          {...register('parentPhone')}
                          type="tel"
                          className="w-full bg-input border border-border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                          {...register('email')}
                          type="email"
                          className={`w-full bg-input border ${errors.email ? 'border-danger focus:ring-danger' : 'border-border focus:ring-primary'} rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2`}
                          placeholder="student@email.com"
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-danger mt-1.5 font-medium">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5">College / Preparing For</label>
                      <div className="relative">
                        <GraduationCap size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                          {...register('college')}
                          className="w-full bg-input border border-border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g. UPSC / IIT / Delhi University"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Section 2: Seat & Shift */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-6 h-6 rounded-md bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold">02</div>
                  <h2 className="text-base font-semibold text-text-primary">Seat & Shift Allocation</h2>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5 after:content-['*'] after:ml-1 after:text-danger">Select Shift</label>
                      <div className="relative">
                        <Armchair size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <ManagerSearchableDropdown
                          value={watchedShift}
                          onChange={(v) => setValue('shift', v, { shouldValidate: true })}
                          options={[
                            { label: 'Select shift...', value: '' },
                            ...SHIFTS.map((s: string) => ({ label: s, value: s }))
                          ]}
                        />
                      </div>
                      {errors.shift && <p className="text-[11px] text-danger mt-1.5 font-medium">{errors.shift.message}</p>}
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5 after:content-['*'] after:ml-1 after:text-danger">Seat Number</label>
                      <ManagerSearchableDropdown
                        value={watchedSeat}
                        onChange={(v) => setValue('seat', v, { shouldValidate: true })}
                        options={[
                          { label: 'Select seat...', value: '' },
                          ...SEATS.map((s: string) => ({ label: s, value: s }))
                        ]}
                      />
                      {errors.seat && <p className="text-[11px] text-danger mt-1.5 font-medium">{errors.seat.message}</p>}
                    </div>

                  </div>
                </div>
              </div>

              {/* Section 3: Fee & Payment */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-6 h-6 rounded-md bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold">03</div>
                  <h2 className="text-base font-semibold text-text-primary">Fee & Payment</h2>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5 after:content-['*'] after:ml-1 after:text-danger">Subscription Plan</label>
                      <div className="relative">
                        <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <ManagerSearchableDropdown
                          value={watchedPlan}
                          onChange={(v) => {
                            setValue('plan', v, { shouldValidate: true });
                            const p = PLANS.find((plan) => plan.value === v);
                            if (p) setValue('amountPaid', String(p.amount - discount));
                          }}
                          options={[
                            { label: 'Select plan...', value: '' },
                            ...PLANS.map((p) => ({ label: p.label, value: p.value }))
                          ]}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Manual Discount (â‚¹)</label>
                      <div className="relative">
                        <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                          {...register('manualDiscount')}
                          type="number"
                          min="0"
                          className="w-full bg-input border border-border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Coupon Code</label>
                      <div className="flex gap-2">
                        <input className="w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary uppercase" placeholder="e.g. SUMMER50" />
                        <button type="button" className="bg-transparent border border-border text-text-primary rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">Apply</button>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5 after:content-['*'] after:ml-1 after:text-danger">Amount Paid Now (â‚¹)</label>
                      <div className="relative">
                        <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                          {...register('amountPaid')}
                          type="number"
                          className={`w-full bg-input border ${errors.amountPaid ? 'border-danger focus:ring-danger' : 'border-border focus:ring-primary'} rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2`}
                        />
                      </div>
                      {errors.amountPaid && <p className="text-[11px] text-danger mt-1.5 font-medium">{errors.amountPaid.message}</p>}
                    </div>

                    <div className="flex flex-col col-span-1 md:col-span-2">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5 after:content-['*'] after:ml-1 after:text-danger">Payment Mode</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(['Cash', 'UPI', 'Card', 'Bank Transfer'] as const).map(mode => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setValue('paymentMode', mode, { shouldValidate: true })}
                            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-[13px] font-medium transition-all duration-200 ${watchedMode === mode ? 'border-primary bg-primary-subtle text-primary ring-1 ring-primary/20' : 'border-border bg-page text-text-secondary hover:border-primary/50 hover:bg-primary-subtle/30'}`}
                          >
                            <CreditCard size={13} />
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col col-span-1 md:col-span-2">
                      <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Transaction ID / Reference</label>
                      <input
                        {...register('transactionId')}
                        className="w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. 41220912â€¦"
                      />
                    </div>

                  </div>
                </div>
              </div>

            </div>{/* end main */}

            <ManagerStudentsAdmissionFormSummary 
              SMART_ID={SMART_ID}
              watchedPlan={watchedPlan}
              watchedShift={watchedShift}
              watchedSeat={watchedSeat}
              baseAmt={baseAmt}
              discount={discount}
              totalPayable={totalPayable}
              watchedAmount={watchedAmount}
              isSubmitting={isSubmitting}
            />

          </div>{/* end layout */}
        </form>
      </div>
    </>
  );
}
