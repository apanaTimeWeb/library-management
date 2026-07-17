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

      <div className="mgr-page">

        {/* Page Header */}
        <div className="mgr-page-header">
          <div>
            <Link href="/manager/manager_students" className="mgr-back-link">
              <ArrowLeft size={14} /> Back to Students
            </Link>
            <h1 className="mgr-page-title">New Student Admission</h1>
            <p className="mgr-page-subtitle">Fill all mandatory (*) fields accurately. Smart ID is auto-generated.</p>
          </div>
          {/* Smart ID Badge */}
          <div className="mgr-smartid-badge">
            <span className="mgr-smartid-label">Smart ID</span>
            <span className="mgr-smartid-value">{SMART_ID}</span>
            <span className="mgr-badge mgr-badge--info">Gap slot reused</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mgr-admission-layout">

            {/* ── LEFT: Form Sections ── */}
            <div className="mgr-admission-main">

              {/* Section 1: Personal Info */}
              <div className="mgr-card">
                <div className="mgr-card-header">
                  <div className="mgr-section-number">01</div>
                  <h2 className="mgr-section-title">Personal Information</h2>
                </div>
                <div className="mgr-card-body">
                  <div className="mgr-form-grid">

                    <div className="mgr-form-field mgr-form-field-full">
                      <label className="mgr-label mgr-label-required">Full Name</label>
                      <div className="mgr-input-icon-wrap">
                        <User size={14} className="mgr-input-icon" />
                        <input
                          {...register('fullName')}
                          className={`mgr-input mgr-input-with-icon${errors.fullName ? ' mgr-input-error' : ''}`}
                          placeholder="Enter student full name"
                        />
                      </div>
                      {errors.fullName && <p className="mgr-error">{errors.fullName.message}</p>}
                    </div>

                    <div className="mgr-form-field">
                      <label className="mgr-label mgr-label-required">Phone Number</label>
                      <div className="mgr-input-icon-wrap">
                        <Phone size={14} className="mgr-input-icon" />
                        <input
                          {...register('phone')}
                          type="tel"
                          className={`mgr-input mgr-input-with-icon${errors.phone ? ' mgr-input-error' : ''}`}
                          placeholder="9876543210"
                        />
                      </div>
                      {errors.phone && <p className="mgr-error">{errors.phone.message}</p>}
                    </div>

                    <div className="mgr-form-field">
                      <label className="mgr-label">Parent / Guardian Phone</label>
                      <div className="mgr-input-icon-wrap">
                        <Phone size={14} className="mgr-input-icon" />
                        <input
                          {...register('parentPhone')}
                          type="tel"
                          className="mgr-input mgr-input-with-icon"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="mgr-form-field">
                      <label className="mgr-label">Email Address</label>
                      <div className="mgr-input-icon-wrap">
                        <Mail size={14} className="mgr-input-icon" />
                        <input
                          {...register('email')}
                          type="email"
                          className={`mgr-input mgr-input-with-icon${errors.email ? ' mgr-input-error' : ''}`}
                          placeholder="student@email.com"
                        />
                      </div>
                      {errors.email && <p className="mgr-error">{errors.email.message}</p>}
                    </div>

                    <div className="mgr-form-field">
                      <label className="mgr-label">College / Preparing For</label>
                      <div className="mgr-input-icon-wrap">
                        <GraduationCap size={14} className="mgr-input-icon" />
                        <input
                          {...register('college')}
                          className="mgr-input mgr-input-with-icon"
                          placeholder="e.g. UPSC / IIT / Delhi University"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Section 2: Seat & Shift */}
              <div className="mgr-card">
                <div className="mgr-card-header">
                  <div className="mgr-section-number">02</div>
                  <h2 className="mgr-section-title">Seat & Shift Allocation</h2>
                </div>
                <div className="mgr-card-body">
                  <div className="mgr-form-grid">

                    <div className="mgr-form-field">
                      <label className="mgr-label mgr-label-required">Select Shift</label>
                      <div className="mgr-input-icon-wrap">
                        <Armchair size={14} className="mgr-input-icon" />
                        <select
                          {...register('shift')}
                          className={`mgr-select mgr-input-with-icon${errors.shift ? ' mgr-input-error' : ''}`}
                        >
                          {SHIFTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      {errors.shift && <p className="mgr-error">{errors.shift.message}</p>}
                    </div>

                    <div className="mgr-form-field">
                      <label className="mgr-label mgr-label-required">Seat Number</label>
                      <select
                        {...register('seat')}
                        className={`mgr-select${errors.seat ? ' mgr-input-error' : ''}`}
                      >
                        {SEATS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.seat && <p className="mgr-error">{errors.seat.message}</p>}
                    </div>



                  </div>
                </div>
              </div>

              {/* Section 3: Fee & Payment */}
              <div className="mgr-card">
                <div className="mgr-card-header">
                  <div className="mgr-section-number">03</div>
                  <h2 className="mgr-section-title">Fee & Payment</h2>
                </div>
                <div className="mgr-card-body">
                  <div className="mgr-form-grid">

                    <div className="mgr-form-field">
                      <label className="mgr-label mgr-label-required">Subscription Plan</label>
                      <div className="mgr-input-icon-wrap">
                        <FileText size={14} className="mgr-input-icon" />
                        <select
                          {...register('plan')}
                          className="mgr-select mgr-input-with-icon"
                          onChange={e => {
                            setValue('plan', e.target.value);
                            const p = PLANS.find(p => p.value === e.target.value);
                            if (p) setValue('amountPaid', String(p.amount - discount));
                          }}
                        >
                          {PLANS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="mgr-form-field">
                      <label className="mgr-label">Manual Discount (₹)</label>
                      <div className="mgr-input-icon-wrap">
                        <IndianRupee size={14} className="mgr-input-icon" />
                        <input
                          {...register('manualDiscount')}
                          type="number"
                          min="0"
                          className="mgr-input mgr-input-with-icon"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="mgr-form-field">
                      <label className="mgr-label">Coupon Code</label>
                      <div className="flex gap-2">
                        <input className="mgr-input uppercase" placeholder="e.g. SUMMER50" />
                        <button type="button" className="mgr-btn-ghost mgr-btn-sm">Apply</button>
                      </div>
                    </div>

                    <div className="mgr-form-field">
                      <label className="mgr-label mgr-label-required">Amount Paid Now (₹)</label>
                      <div className="mgr-input-icon-wrap">
                        <IndianRupee size={14} className="mgr-input-icon" />
                        <input
                          {...register('amountPaid')}
                          type="number"
                          className={`mgr-input mgr-input-with-icon${errors.amountPaid ? ' mgr-input-error' : ''}`}
                        />
                      </div>
                      {errors.amountPaid && <p className="mgr-error">{errors.amountPaid.message}</p>}
                    </div>

                    <div className="mgr-form-field mgr-form-field-full">
                      <label className="mgr-label mgr-label-required">Payment Mode</label>
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
                      <label className="mgr-label">Transaction ID / Reference</label>
                      <input
                        {...register('transactionId')}
                        className="mgr-input"
                        placeholder="e.g. 41220912…"
                      />
                    </div>



                  </div>
                </div>
              </div>

            </div>{/* end main */}

            {/* ── RIGHT: Admission Summary ── */}
            <aside className="mgr-admission-summary">
              <div className="mgr-card sticky top-[80px]">
                <div className="mgr-card-header">
                  <h2 className="mgr-section-title">Admission Summary</h2>
                </div>
                <div className="mgr-card-body">
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
                      className="mgr-btn-primary mgr-btn-full"
                    >
                      <CheckCircle size={15} />
                      {isSubmitting ? 'Confirming…' : 'Confirm Admission'}
                    </button>
                    <Link href="/manager/manager_students" className="mgr-btn-ghost mgr-btn-full">
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
