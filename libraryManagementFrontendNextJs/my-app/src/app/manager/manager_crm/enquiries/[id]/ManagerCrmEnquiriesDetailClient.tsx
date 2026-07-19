'use client';
// RESPONSIBILITY: Renders detailed CRM enquiry page, including timelines and follow-up updates.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { logger } from '@/lib/logger';
import {
  ArrowLeft,
  Phone,
  MapPin,
  User,
  CalendarDays,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Edit2,
  AlertTriangle,
} from 'lucide-react';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { useManagerCrmEnquiriesDetail } from '@/app/manager/manager_crm/manager_crm_hooks/useManagerCrmEnquiriesDetail';

import { MANAGER_CRM_URLS } from '@/app/manager/manager_crm/manager_crm_url_config';
import {
  type Enquiry,
  type EnquiryStatus,
  type FollowUp,
  type MarkLostModalProps,
} from '@/app/manager/manager_crm/manager_crm_types';
import { type EnquiryDetail } from '@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes';
import { STATUS_BADGE } from '@/app/manager/manager_crm/manager_crm_constants';
import { maskPhone, getInitials } from '@/app/manager/manager_crm/manager_crm_utils';
import {
  followUpSchema,
  type FollowUpFormData,
  markLostSchema,
  type MarkLostFormData,
} from '@/app/manager/manager_crm/manager_crm_shared_components/manager_crm_schema';

/* ── Status Select options ─────────────────────────────── */
const STATUS_OPTIONS: EnquiryStatus[] = ['New', 'Visited', 'Interested', 'Converted', 'Lost'];

import { MarkLostModal } from '@/app/manager/manager_crm/manager_crm_shared_components/ManagerCrmEnquiriesMarkLostModal';
import { ManagerCrmEnquiriesLeftColumn } from '@/app/manager/manager_crm/manager_crm_shared_components/ManagerCrmEnquiriesLeftColumn';

/* ── Main Page ─────────────────────────────────────────── */
export function ManagerCrmEnquiriesDetailClient({ id }: { id: string }) {
  const {
    router,
    enquiry,
    loading,
    currentStatus,
    setCurrentStatus,
    showLostModal,
    setShowLostModal,
    lostSubmitting,
    statusUpdating,
    registerFU,
    handleSubmitFU,
    fuErrors,
    fuSubmitting,
    handleStatusUpdate,
    onSubmitFU,
    handleConvert,
    handleMarkLostConfirm,
  } = useManagerCrmEnquiriesDetail(id);

  /* ── Loading / Not found ── */
  if (loading) {
    return <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-full space-y-6 flex flex-col items-center justify-center text-center h-full"><p>Loading...</p></div>;
  }

  if (!enquiry) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-full space-y-6 flex flex-col items-center justify-center text-center h-full bg-card border border-border rounded-xl">
        <XCircle size={48} className="text-text-secondary mb-4 mx-auto" />
        <p className="text-lg font-semibold text-text-primary mb-1">Enquiry Not Found</p>
        <p className="text-sm text-text-secondary mb-6">
          The enquiry with ID &ldquo;{id}&rdquo; does not exist.
        </p>
        <button
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-transparent text-text-primary border border-border hover:bg-bg-pageorder/40 transition-all mt-12"
          onClick={() => router.push(MANAGER_CRM_URLS.ENQUIRIES)}
        >
          <ArrowLeft size={15} />
          Back to Pipeline
        </button>
      </div>
    );
  }



  /* ── Status badge class ── */
  const statusBadgeCls = STATUS_BADGE[enquiry.status as keyof typeof STATUS_BADGE] || STATUS_BADGE['New'];

  /* ── Follow-up next date label ── */
  const followUpDateClass = enquiry.isOverdue
    ? 'crm-followup-date-overdue'
    : enquiry.isToday
    ? 'crm-followup-date-today'
    : 'crm-followup-date-upcoming';

  const followUpDateLabel = enquiry.isOverdue
    ? 'Overdue'
    : enquiry.isToday
    ? 'Today'
    : 'Upcoming';

  return (
    <>
      <Toaster position="bottom-right" />

      {/* Mark Lost Modal */}
      {showLostModal && (
        <MarkLostModal
          onConfirm={handleMarkLostConfirm}
          onCancel={() => setShowLostModal(false)}
          isSubmitting={lostSubmitting}
        />
      )}

      <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-full space-y-6">

        {/* ── Breadcrumb + Back ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <button
            className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors border border-border bg-card shadow-sm hover:bg-bg-pageorder/40"
            onClick={() => router.push(MANAGER_CRM_URLS.ENQUIRIES)}
            title="Back to Pipeline"
            aria-label="Back to pipeline"
          >
            <ArrowLeft size={18} />
          </button>
          <nav className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
            CRM &rsaquo; Enquiries &rsaquo;{' '}
            <span className="text-text-primary font-bold">{enquiry.name}</span>
          </nav>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* ══════════════════════════════
              LEFT COLUMN  (60%)
          ══════════════════════════════ */}
          <div className="flex flex-col gap-6 min-w-0">

            <ManagerCrmEnquiriesLeftColumn enquiry={enquiry} />

          </div>

          {/* ══════════════════════════════
              RIGHT COLUMN  (40%) — sticky
          ══════════════════════════════ */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">

            {/* ── Status Update Card ── */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4 m-0">Current Status</h3>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <ManagerSearchableDropdown
                    className="w-full"
                    value={currentStatus}
                    onChange={(val) => setCurrentStatus(val as EnquiryStatus)}
                    options={STATUS_OPTIONS.map(s => ({ label: s, value: s }))}
                  />
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:opacity-90 transition-all disabled:opacity-55 disabled:cursor-not-allowed"
                  onClick={() => handleStatusUpdate()}
                  disabled={statusUpdating || currentStatus === enquiry.status}
                >
                  {statusUpdating ? <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <CheckCircle size={14} />}
                  {statusUpdating ? 'Saving…' : 'Update'}
                </button>
              </div>
            </div>

            {/* ── Add Follow-Up Card ── */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4 m-0">Add Follow-Up</h3>
              <form
                id="followup-form"
                onSubmit={handleSubmitFU(onSubmitFU)}
                noValidate
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fu-date" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1 after:content-['*'] after:text-danger after:ml-1">
                    Follow-up Date
                  </label>
                  <input
                    id="fu-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className={`crm-input crm-input-date${fuErrors.date ? ' crm-input--error' : ''}`}
                    {...registerFU('date')}
                  />
                  {fuErrors.date && <p className="crm-error">{fuErrors.date.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fu-remark" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1 after:content-['*'] after:text-danger after:ml-1">
                    Remark
                  </label>
                  <textarea
                    id="fu-remark"
                    rows={3}
                    className={`crm-textarea${fuErrors.remark ? ' crm-textarea--error' : ''}`}
                    placeholder="What happened in this interaction?"
                    {...registerFU('remark')}
                  />
                  {fuErrors.remark && <p className="crm-error">{fuErrors.remark.message}</p>}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:opacity-90 transition-all disabled:opacity-55 disabled:cursor-not-allowed w-full"
                  disabled={fuSubmitting}
                >
                  {fuSubmitting ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> Adding…
                    </>
                  ) : (
                    <>
                      <Plus size={15} /> Add Follow-Up
                    </>
                  )}
                </button>
              </form>

              {/* Next follow-up display */}
              {(enquiry.isToday || enquiry.isUpcoming || enquiry.isOverdue) && (
                <>
                  <div className="h-px bg-bg-pageorder my-5" />
                  <div className="flex items-center justify-between bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <CalendarDays size={13} />
                      <span>
                        Next follow-up:{' '}
                        <strong className={followUpDateClass}>{followUpDateLabel}</strong>
                      </span>
                    </div>
                    <button
                      className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                      title="Edit follow-up date"
                      aria-label="Edit follow-up date"
                    >
                      <Edit2 size={13} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* ── Actions Card ── */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4 m-0">Actions</h3>

              {/* Convert to Admission */}
              <button
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-success text-white hover:opacity-90 transition-all disabled:opacity-55 w-full"
                onClick={handleConvert}
                disabled={enquiry.status === 'Converted'}
              >
                <CheckCircle size={16} />
                {enquiry.status === 'Converted'
                  ? 'Already Converted'
                  : 'Convert to Admission'}
              </button>

              {/* Mark as Lost */}
              <button
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold border border-danger text-danger hover:bg-danger/10 transition-all disabled:opacity-55 w-full"
                onClick={() => setShowLostModal(true)}
                disabled={enquiry.status === 'Lost'}
              >
                <XCircle size={15} />
                {enquiry.status === 'Lost' ? 'Already Marked Lost' : 'Mark as Lost'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}




