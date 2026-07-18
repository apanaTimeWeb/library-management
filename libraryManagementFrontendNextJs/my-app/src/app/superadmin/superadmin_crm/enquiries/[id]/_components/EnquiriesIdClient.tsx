'use client';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';

// RESPONSIBILITY: Renders detailed CRM enquiry view, follow-up timeline, and status transitions.
import { Toaster } from 'react-hot-toast';
import {
  ArrowLeft, Phone, MapPin, User, CalendarDays, Tag, Clock, CheckCircle, XCircle, Plus, Edit2, AlertTriangle, Loader2
} from 'lucide-react';
import { type EnquiryStatus, type FollowUp, STATUS_BADGE, maskPhone, getInitials } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/superadmin_types';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import type { SuperadminCrmMarkLostModalProps as MarkLostModalProps } from '@/app/superadmin/superadmin_crm/superadmin_crm_types/SuperadminCrmTypes';
import { useEnquiriesIdClient } from '@/app/superadmin/superadmin_crm/enquiries/[id]/_components/useEnquiriesIdClient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { markLostSchema, type MarkLostFormData } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/superadmin_schema';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

const STATUS_OPTIONS: EnquiryStatus[] = ['New', 'Visited', 'Interested', 'Converted', 'Lost'];

function timelineDotClass(by: string): string {
  if (by === 'System') return 'bg-input border-2 border-border';
  const lower = by.toLowerCase();
  if (lower.includes('sarah')) return 'bg-success';
  if (lower.includes('mike'))  return 'bg-info';
  if (lower.includes('admin')) return 'bg-warning';
  return 'bg-primary';
}

function MarkLostModal({ onConfirm, onCancel, isSubmitting }: MarkLostModalProps) {
  const { register, handleSubmit } = useForm<MarkLostFormData>({
    resolver: zodResolver(markLostSchema),
    defaultValues: { reason: '' },
  });
  const onSubmit = (d: MarkLostFormData) => onConfirm(d.reason ?? '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onCancel}>
      <div className="bg-card w-full max-w-sm rounded-[var(--radius-xl)] shadow-2xl border border-border flex flex-col relative overflow-hidden" role="dialog" aria-label="Mark enquiry as lost" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger"><AlertTriangle size={22} /></div>
          <div>
            <h3 className="text-[18px] font-bold text-primary">Mark as Lost?</h3>
            <p className="text-[12px] text-text-secondary mt-1 leading-snug">This will move the enquiry to the <strong className="text-danger font-bold">Lost</strong> column. You can still view the full history and re-open it later.</p>
          </div>
        </div>
        <form id="mark-lost-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <label className="text-[12px] font-bold text-text-secondary mb-2 block" htmlFor="lost-reason">Reason <span className="text-[10px] opacity-70">(optional)</span></label>
            <textarea id="lost-reason" rows={3} className="w-full bg-input border border-border rounded-[var(--radius-md)] py-2.5 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Didn't respond after 3 follow-ups, found another library…" {...register('reason')} />
          </div>
          <div className="px-6 py-4 bg-muted border-t border-border flex gap-3">
            <button type="button" className="flex-1 px-4 py-2 bg-transparent border border-border text-text-primary text-[14px] font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors cursor-pointer" onClick={onCancel}>Cancel</button>
            <button type="submit" form="mark-lost-form" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-danger text-danger-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all disabled:opacity-50 cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Marking…</> : <><XCircle size={16} /> Mark as Lost</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string; }) {
  return (
    <div className="flex flex-col">
      <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5 mb-1">{icon}{label}</p>
      <p className="text-[14px] font-bold text-text-primary">{value}</p>
    </div>
  );
}

export function EnquiriesIdClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = require('react').use(params);
  const {
    router, enquiry, loading, currentStatus, setCurrentStatus, showLostModal, setShowLostModal, lostSubmitting, statusUpdating,
    registerFU, handleSubmitFU, fuErrors, fuSubmitting, handleStatusUpdate, handleAddFollowUp, handleConvert, handleMarkLostConfirm
  } = useEnquiriesIdClient(id);

  if (loading) return <div className="relative p-2 sm:p-4 flex items-center justify-center py-24"><p className="text-[14px] text-text-secondary font-bold animate-pulse">Loading...</p></div>;

  if (!enquiry) {
    return (
      <div className="relative p-2 sm:p-4 flex flex-col items-center justify-center py-32 text-center">
        <XCircle size={48} className="text-danger opacity-80 mb-4" />
        <p className="text-[22px] font-bold text-text-primary">Enquiry Not Found</p>
        <p className="text-[14px] text-text-secondary mt-2 max-w-md">The enquiry with ID &ldquo;{id}&rdquo; does not exist.</p>
        <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-border text-text-primary text-[14px] font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors mt-8 cursor-pointer" onClick={() => router.push(SUPERADMIN_ROUTES.CRM_ENQUIRIES)}>
          <ArrowLeft size={16} /> Back to Pipeline
        </button>
      </div>
    );
  }

  const statusBadgeCls = STATUS_BADGE[enquiry.status as keyof typeof STATUS_BADGE];
  const followUpDateClass = enquiry.isOverdue ? 'text-danger' : enquiry.isToday ? 'text-warning' : 'text-success';
  const followUpDateLabel = enquiry.isOverdue ? 'Overdue' : enquiry.isToday ? 'Today' : 'Upcoming';

  return (
    <>
      <Toaster position="bottom-right" />
      {showLostModal && <MarkLostModal onConfirm={handleMarkLostConfirm} onCancel={() => setShowLostModal(false)} isSubmitting={lostSubmitting} />}

      <div className="relative p-2 sm:p-4">
        {/* Breadcrumb + Back */}
        <div className="flex items-center gap-4 mb-6">
          <button className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] border border-border bg-card text-text-secondary hover:text-text-primary hover:bg-input transition-colors shadow-sm cursor-pointer" onClick={() => router.push(SUPERADMIN_ROUTES.CRM_ENQUIRIES)} title="Back to Pipeline">
            <ArrowLeft size={16} />
          </button>
          <nav className="text-[12px] font-bold text-text-secondary flex items-center gap-2">
            <span>CRM</span> &rsaquo; <span>Enquiries</span> &rsaquo; <span className="text-primary">{enquiry.name}</span>
          </nav>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* LEFT COLUMN (60%) */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Info Card */}
            <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex flex-shrink-0 items-center justify-center text-[24px] font-extrabold">{getInitials(enquiry.name)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h1 className="text-[24px] font-extrabold text-text-primary tracking-tight">{enquiry.name}</h1>
                    <span className={`inline-flex items-center px-3 py-1 rounded-[var(--radius-full)] text-[12px] font-bold ${statusBadgeCls}`}>{enquiry.status}</span>
                  </div>
                  <p className="flex items-center gap-1.5 text-[14px] text-text-secondary font-mono"><Phone size={14} /> +91 {enquiry.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <InfoItem icon={<Tag size={14} />} label="Source" value={enquiry.source} />
                <InfoItem icon={<Clock size={14} />} label="Preferred Shift" value={enquiry.shift} />
                <InfoItem icon={<User size={14} />} label="Handled By" value={enquiry.handledBy} />
                <InfoItem icon={<MapPin size={14} />} label="Branch Preference" value={enquiry.preferredBranch} />
                <InfoItem icon={<CalendarDays size={14} />} label="Enquiry Date" value={enquiry.enquiryDate} />
                <InfoItem icon={<Phone size={14} />} label="Phone (masked)" value={maskPhone(enquiry.phone)} />
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm flex-1">
              <h2 className="text-[16px] font-bold text-text-primary border-b border-border pb-3 mb-6 flex items-center gap-2"><Clock size={18} className="text-primary"/> Activity Timeline</h2>
              {enquiry.followUps.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Clock size={32} className="text-text-secondary opacity-30 mb-3" />
                  <p className="text-[14px] text-text-secondary font-medium">No follow-ups recorded yet</p>
                </div>
              ) : (
                <div className="relative pl-4 border-l-2 border-border space-y-6">
                  {enquiry.followUps.map((fu: FollowUp) => (
                    <div className="relative" key={fu.id}>
                      <div className={`absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-card ${timelineDotClass(fu.by)}`} />
                      <div className="bg-input rounded-[var(--radius-md)] p-4 ml-2 shadow-sm border border-border/50">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                          <p className="text-[12px] font-bold text-text-primary">{fu.date} <span className="text-text-secondary ml-1 font-mono text-[11px] font-medium">{fu.time}</span></p>
                          <p className="text-[11px] font-bold text-text-secondary italic">by {fu.by}</p>
                        </div>
                        <p className="text-[14px] text-text-primary leading-relaxed whitespace-pre-wrap">{fu.remark}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN (40%) */}
          <div className="w-full xl:w-[380px] flex-shrink-0 flex flex-col gap-6">
            {/* Status Update Card */}
            <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-text-secondary uppercase tracking-wider mb-4">Current Status</h3>
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <SuperadminSearchableDropdown options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))} value={currentStatus} onChange={(val) => setCurrentStatus(val as EnquiryStatus)} />
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all disabled:opacity-50 cursor-pointer h-10" onClick={handleStatusUpdate} disabled={statusUpdating || currentStatus === enquiry.status}>
                  {statusUpdating ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                  {statusUpdating ? 'Saving…' : 'Update'}
                </button>
              </div>
            </div>

            {/* Add Follow-Up Card */}
            <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-text-secondary uppercase tracking-wider mb-4">Add Follow-Up</h3>
              <form id="followup-form" onSubmit={handleSubmitFU(handleAddFollowUp)} noValidate className="space-y-4">
                <div>
                  <label htmlFor="fu-date" className="text-[12px] font-bold text-text-secondary block mb-1">Follow-up Date <span className="text-danger">*</span></label>
                  <input id="fu-date" type="date" min={new Date().toISOString().split('T')[0]} className={`w-full bg-input border ${fuErrors.date ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors h-10`} {...registerFU('date')} />
                  {fuErrors.date && <p className="text-[12px] font-bold text-danger mt-1">{fuErrors.date.message}</p>}
                </div>
                <div>
                  <label htmlFor="fu-remark" className="text-[12px] font-bold text-text-secondary block mb-1">Remark <span className="text-danger">*</span></label>
                  <textarea id="fu-remark" rows={3} className={`w-full bg-input border ${fuErrors.remark ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2.5 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} placeholder="What happened in this interaction?" {...registerFU('remark')} />
                  {fuErrors.remark && <p className="text-[12px] font-bold text-danger mt-1">{fuErrors.remark.message}</p>}
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all disabled:opacity-50 cursor-pointer h-10" disabled={fuSubmitting}>
                  {fuSubmitting ? <><Loader2 size={16} className="animate-spin" /> Adding…</> : <><Plus size={16} /> Add Follow-Up</>}
                </button>
              </form>
              {(enquiry.isToday || enquiry.isUpcoming || enquiry.isOverdue) && (
                <>
                  <hr className="my-5 border-border" />
                  <div className="flex items-center justify-between bg-input p-3 rounded-[var(--radius-md)] border border-border">
                    <div className="flex items-center gap-2 text-[12px]">
                      <CalendarDays size={14} className="text-text-secondary" />
                      <span className="text-text-secondary font-bold">Next follow-up: <strong className={followUpDateClass}>{followUpDateLabel}</strong></span>
                    </div>
                    <button className="w-6 h-6 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:bg-card hover:text-text-primary transition-colors cursor-pointer" title="Edit follow-up date"><Edit2 size={12} /></button>
                  </div>
                </>
              )}
            </div>

            {/* Actions Card */}
            <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-text-secondary uppercase tracking-wider mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-success text-success-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all disabled:opacity-50 cursor-pointer h-10" onClick={handleConvert} disabled={enquiry.status === 'Converted'}>
                  <CheckCircle size={16} />
                  {enquiry.status === 'Converted' ? 'Already Converted' : 'Convert to Admission'}
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-danger text-danger-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all disabled:opacity-50 cursor-pointer h-10" onClick={() => setShowLostModal(true)} disabled={enquiry.status === 'Lost'}>
                  <XCircle size={16} />
                  {enquiry.status === 'Lost' ? 'Already Marked Lost' : 'Mark as Lost'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
