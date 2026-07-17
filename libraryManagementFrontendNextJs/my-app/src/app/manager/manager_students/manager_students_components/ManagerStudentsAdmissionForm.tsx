// RESPONSIBILITY: Renders the ManagerStudentsAdmissionForm.tsx component.
'use client';

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
      {/* Success Modal — shows after admission confirmed */}
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
            background: 'var(--mgr-bg-card)',
            color: 'var(--mgr-text-primary)',
            border: '1px solid var(--mgr-border)',
            fontSize: 13,
          },
        }}
      />

      <div className="p-6 min-h-screen">

        {/* Page Header */}
        <div className="p-6 min-h-screen-header">
          <div>
            <Link href="/manager/manager_students" className="mgr-back-link">
              <ArrowLeft size={14} /> Back to Students
            </Link>
            <h1 className="text-[22px] font-bold text-text-primary">New Student Admission</h1>
            <p className="p-6 min-h-screen-subtitle">Fill all mandatory (*) fields accurately. Smart ID is auto-generated.</p>
          </div>
          {/* Smart ID Badge */}
          <div className="mgr-smartid-badge">
            <span className="mgr-smartid-label">Smart ID</span>
            <span className="mgr-smartid-value">{SMART_ID}</span>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold rounded-full px-2.5 py-0.5 text-[11px] font-semibold--info">Gap slot reused</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mgr-admission-layout">

            {/* ── LEFT: Form Sections ── */}
            <div className="mgr-admission-main">

              {/* Section 1: Personal Info */}
              <div className="bg-bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="mgr-section-number">01</div>
                  <h2 className="text-base font-semibold text-text-primary">Personal Information</h2>
                </div>
                <div className="">
                  <div className="mgr-form-grid">

                    <div className="mgr-form-field mgr-form-field-full">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5 block text-sm font-medium text-text-secondary mb-1.5-required">Full Name</label>
                      <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap">
                        <User size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                        <input
                          {...register('fullName')}
                          className={`w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon${errors.fullName ? ' w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-error' : ''}`}
                          placeholder="Enter student full name"
                        />
                      </div>
                      {errors.fullName && <p className="mgr-error">{errors.fullName.message}</p>}
                    </div>

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5 block text-sm font-medium text-text-secondary mb-1.5-required">Phone Number</label>
                      <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap">
                        <Phone size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                        <input
                          {...register('phone')}
                          type="tel"
                          className={`w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon${errors.phone ? ' w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-error' : ''}`}
                          placeholder="9876543210"
                        />
                      </div>
                      {errors.phone && <p className="mgr-error">{errors.phone.message}</p>}
                    </div>

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Parent / Guardian Phone</label>
                      <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap">
                        <Phone size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                        <input
                          {...register('parentPhone')}
                          type="tel"
                          className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Email Address</label>
                      <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap">
                        <Mail size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                        <input
                          {...register('email')}
                          type="email"
                          className={`w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon${errors.email ? ' w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-error' : ''}`}
                          placeholder="student@email.com"
                        />
                      </div>
                      {errors.email && <p className="mgr-error">{errors.email.message}</p>}
                    </div>

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">College / Preparing For</label>
                      <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap">
                        <GraduationCap size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                        <input
                          {...register('college')}
                          className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon"
                          placeholder="e.g. UPSC / IIT / Delhi University"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Section 2: Seat & Shift */}
              <div className="bg-bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="mgr-section-number">02</div>
                  <h2 className="text-base font-semibold text-text-primary">Seat & Shift Allocation</h2>
                </div>
                <div className="">
                  <div className="mgr-form-grid">

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5 block text-sm font-medium text-text-secondary mb-1.5-required">Select Shift</label>
                      <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap">
                        <Armchair size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                        <select
                          {...register('shift')}
                          className={`mgr-select w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon${errors.shift ? ' w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-error' : ''}`}
                        >
                          {SHIFTS.map((s: any) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      {errors.shift && <p className="mgr-error">{errors.shift.message}</p>}
                    </div>

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5 block text-sm font-medium text-text-secondary mb-1.5-required">Seat Number</label>
                      <select
                        {...register('seat')}
                        className={`mgr-select${errors.seat ? ' w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-error' : ''}`}
                      >
                        {SEATS.map((s: any) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.seat && <p className="mgr-error">{errors.seat.message}</p>}
                    </div>



                  </div>
                </div>
              </div>

              {/* Section 3: Fee & Payment */}
              <div className="bg-bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="mgr-section-number">03</div>
                  <h2 className="text-base font-semibold text-text-primary">Fee & Payment</h2>
                </div>
                <div className="">
                  <div className="mgr-form-grid">

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5 block text-sm font-medium text-text-secondary mb-1.5-required">Subscription Plan</label>
                      <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap">
                        <FileText size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                        <select
                          {...register('plan')}
                          className="mgr-select w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon"
                          onChange={e => {
                            setValue('plan', e.target.value);
                            const p = PLANS.find((p: any) => p.value === e.target.value);
                            if (p) setValue('amountPaid', String(p.amount - discount));
                          }}
                        >
                          {PLANS.map((p: any) => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Manual Discount (₹)</label>
                      <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap">
                        <IndianRupee size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                        <input
                          {...register('manualDiscount')}
                          type="number"
                          min="0"
                          className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Coupon Code</label>
                      <div className="flex gap-2">
                        <input className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent uppercase" placeholder="e.g. SUMMER50" />
                        <button type="button" className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 mgr-btn-sm">Apply</button>
                      </div>
                    </div>

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5 block text-sm font-medium text-text-secondary mb-1.5-required">Amount Paid Now (₹)</label>
                      <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap">
                        <IndianRupee size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                        <input
                          {...register('amountPaid')}
                          type="number"
                          className={`w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon${errors.amountPaid ? ' w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-error' : ''}`}
                        />
                      </div>
                      {errors.amountPaid && <p className="mgr-error">{errors.amountPaid.message}</p>}
                    </div>

                    <div className="mgr-form-field mgr-form-field-full">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5 block text-sm font-medium text-text-secondary mb-1.5-required">Payment Mode</label>
                      <div className="mgr-payment-mode-group">
                        {(['Cash', 'UPI', 'Card', 'Bank Transfer'] as const).map(mode => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setValue('paymentMode', mode)}
                            className={`mgr-payment-mode-btn${watchedMode === mode ? ' active' : ''}`}
                          >
                            <CreditCard size={13} />
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mgr-form-field">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Transaction ID / Reference</label>
                      <input
                        {...register('transactionId')}
                        className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g. 41220912…"
                      />
                    </div>



                  </div>
                </div>
              </div>

            </div>{/* end main */}

            {/* ── RIGHT: Admission Summary ── */}
            <aside className="mgr-admission-summary">
              <div className="bg-bg-card rounded-xl border border-border p-6 sticky top-[80px]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-text-primary">Admission Summary</h2>
                </div>
                <div className="">
                  <div className="mgr-summary-rows">
                    <div className="mgr-summary-row">
                      <span className="mgr-summary-label">Smart ID</span>
                      <span className="mgr-smartid-chip">{SMART_ID}</span>
                    </div>
                    <div className="mgr-summary-row">
                      <span className="mgr-summary-label">Plan</span>
                      <span className="mgr-summary-value">{watchedPlan}</span>
                    </div>
                    <div className="mgr-summary-row">
                      <span className="mgr-summary-label">Shift</span>
                      <span className="mgr-summary-value">{watchedShift.split(' ')[0]}</span>
                    </div>
                    <div className="mgr-summary-row">
                      <span className="mgr-summary-label">Seat</span>
                      <span className="mgr-summary-value">{watchedSeat}</span>
                    </div>

                    <div className="mgr-summary-divider" />
                    <div className="mgr-summary-row">
                      <span className="mgr-summary-label">Base Amount</span>
                      <span className="mgr-summary-value">₹{baseAmt.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="mgr-summary-row">
                      <span className="mgr-summary-label">Discount</span>
                      <span className="mgr-text-warning">− ₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="mgr-summary-total-row">
                      <span className="mgr-summary-total-label">Total Payable</span>
                      <span className="mgr-summary-total-value">₹{totalPayable.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="mgr-summary-row">
                      <span className="mgr-summary-label">Paid Now</span>
                      <span className="mgr-text-success">₹{Number(watchedAmount || 0).toLocaleString('en-IN')}</span>
                    </div>
                    {totalPayable - Number(watchedAmount || 0) > 0 && (
                      <div className="mgr-summary-row">
                        <span className="mgr-summary-label">Balance Due</span>
                        <span className="mgr-text-danger">₹{(totalPayable - Number(watchedAmount || 0)).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>

                  <div className="mgr-summary-actions">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2 mgr-btn-full"
                    >
                      <CheckCircle size={15} />
                      {isSubmitting ? 'Confirming…' : 'Confirm Admission'}
                    </button>
                    <Link href="/manager/manager_students" className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 mgr-btn-full">
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

          </div>{/* end layout */}
        </form>
      </div>
    </>
  );
}



