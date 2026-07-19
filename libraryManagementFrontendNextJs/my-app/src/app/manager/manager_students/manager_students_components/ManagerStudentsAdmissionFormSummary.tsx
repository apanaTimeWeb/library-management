'use client';
// RESPONSIBILITY: Renders the read-only admission summary sidebar. Displays plan, shift, seat, and pricing breakdown. Receives all data via props — no API calls.

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';

export interface ManagerStudentsAdmissionFormSummaryProps {
  SMART_ID: string;
  watchedPlan: string;
  watchedShift: string;
  watchedSeat: string;
  baseAmt: number;
  discount: number;
  totalPayable: number;
  watchedAmount: string | number;
  isSubmitting: boolean;
}

export function ManagerStudentsAdmissionFormSummary({
  SMART_ID, watchedPlan, watchedShift, watchedSeat, baseAmt, discount, totalPayable, watchedAmount, isSubmitting
}: ManagerStudentsAdmissionFormSummaryProps) {
  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-text-primary">Admission Summary</h2>
        </div>
        <div>
          <div className="space-y-3.5 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Smart ID</span>
              <span className="bg-primary-subtle text-primary px-2 py-0.5 rounded text-xs font-bold font-mono tracking-tight">{SMART_ID}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Plan</span>
              <span className="font-semibold text-text-primary">{watchedPlan}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Shift</span>
              <span className="font-semibold text-text-primary">{watchedShift.split(' ')[0]}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Seat</span>
              <span className="font-semibold text-text-primary">{watchedSeat}</span>
            </div>
            <div className="h-px bg-border my-4" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Base Amount</span>
              <span className="font-semibold text-text-primary">₹{baseAmt.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Discount</span>
              <span className="font-semibold text-warning">− ₹{discount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center pt-2 pb-1">
              <span className="text-[15px] font-bold text-text-primary">Total Payable</span>
              <span className="text-[18px] font-bold text-primary">₹{totalPayable.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Paid Now</span>
              <span className="font-semibold text-success">₹{Number(watchedAmount || 0).toLocaleString('en-IN')}</span>
            </div>
            {totalPayable - Number(watchedAmount || 0) > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Balance Due</span>
                <span className="font-semibold text-danger">₹{(totalPayable - Number(watchedAmount || 0)).toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50">
              <CheckCircle size={15} />
              {isSubmitting ? 'Confirming…' : 'Confirm Admission'}
            </button>
            <Link href={MANAGER_ROUTES.STUDENTS} className="w-full flex justify-center items-center gap-2 bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-primary-subtle hover:border-primary transition-colors">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}


