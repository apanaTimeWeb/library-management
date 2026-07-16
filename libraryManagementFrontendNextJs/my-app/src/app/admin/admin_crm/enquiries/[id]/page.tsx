'use client';

// RESPONSIBILITY: Renders the CRM Enquiry detail page with status updates, follow-up timeline, and action buttons.
// DATA FLOW: Next.js Router -> AdminCrmEnquiryDetailPage -> (MarkLostModal, InfoItem, timeline, status card)

import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import {
  ArrowLeft, Phone, MapPin, User, CalendarDays, Tag,
  Clock, CheckCircle, XCircle, Plus, Edit2, AlertTriangle,
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { ADMIN_ROUTES, ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import {
  type Enquiry,
  type EnquiryStatus,
  type FollowUp,
  STATUS_BADGE,
  maskPhone,
  getInitials,
} from '@/app/admin/admin_crm/admin_crm_components/AdminCrmtypes/AdminCrmtypes';
import {
  followUpSchema,
  type FollowUpFormData,
  markLostSchema,
  type MarkLostFormData,
} from '@/app/admin/admin_crm/admin_crm_components/AdminCrmschema/AdminCrmschema';

// Rule 44: FetchState enum — no boolean loading flags
type FetchState = 'idle' | 'loading' | 'success' | 'error';

// Rule 35: no magic strings for status options
const STATUS_OPTIONS: EnquiryStatus[] = ['New', 'Visited', 'Interested', 'Converted', 'Lost'];

function timelineDotClass(by: string): string {
  if (by === 'System') return 'crm-timeline-dot--system';
  const lower = by.toLowerCase();
  if (lower.includes('sarah')) return 'crm-timeline-dot--success';
  if (lower.includes('mike'))  return 'crm-timeline-dot--info';
  if (lower.includes('admin')) return 'crm-timeline-dot--warning';
  return '';
}

interface MarkLostModalProps {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

function MarkLostModal({ onConfirm, onCancel, isSubmitting }: MarkLostModalProps) {
  const { register, handleSubmit } = useForm<MarkLostFormData>({
    resolver: zodResolver(markLostSchema),
    defaultValues: { reason: '' },
  });
  const onSubmit = (d: MarkLostFormData) => onConfirm(d.reason ?? '');

  return (
    <div className="crm-modal-overlay" onClick={onCancel}>
      <div
        className="crm-modal"
        role="dialog"
        aria-label="Mark enquiry as lost"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crm-modal-header">
          <div className="crm-modal-icon-wrap">
            <AlertTriangle size={22} className="crm-modal-icon-danger" />
          </div>
          <div>
            <h3 className="crm-modal-title">Mark as Lost?</h3>
            <p className="crm-modal-desc">
              This will move the enquiry to the{' '}
              <strong className="crm-modal-desc-danger">Lost</strong> column.
              You can still view the full history and re-open it later.
            </p>
          </div>
        </div>
        <form id="mark-lost-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="crm-modal-field">
            <label className="crm-label" htmlFor="lost-reason">
              Reason <span className="crm-label-optional">(optional)</span>
            </label>
            <textarea
              id="lost-reason"
              rows={3}
              className="crm-textarea"
              placeholder="e.g. Didn't respond after 3 follow-ups…"
              {...register('reason')}
            />
          </div>
          <div className="crm-modal-btns">
            <button type="button" className="crm-btn-ghost crm-btn-flex-1" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              form="mark-lost-form"
              className="crm-btn-danger-solid crm-btn-flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? <><span className="crm-spinner" /> Marking…</> : <><XCircle size={15} /> Mark as Lost</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="crm-info-item-label">{icon}{label}</p>
      <p className="crm-info-item-value">{value}</p>
    </div>
  );
}

export default function AdminCrmEnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [enquiry, setEnquiry]           = useState<Enquiry | null>(null);
  const [fetchState, setFetchState]     = useState<FetchState>('loading');
  const [currentStatus, setCurrentStatus] = useState<EnquiryStatus>('New');
  const [showLostModal, setShowLostModal] = useState(false);
  const [lostSubmitting, setLostSubmitting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    // Rule 55: id is the only dep — re-fetch when route param changes
    setFetchState('loading');
    fetchApi(ADMIN_API_ROUTES.CRM_ENQUIRY_BY_ID(id))
      .then((e: unknown) => {
        const raw = e as Record<string, unknown>;
        if (!raw) { setFetchState('error'); return; }
        const mapped: Enquiry = {
          id:              String(raw.id ?? ''),
          name:            String(raw.name ?? ''),
          phone:           String(raw.phone ?? ''),
          shift:           String(raw.shift || raw.preferredShift || 'General'),
          status:          (String(raw.status ?? 'new').charAt(0).toUpperCase() + String(raw.status ?? 'new').slice(1)) as EnquiryStatus,
          handledBy:       typeof raw.handledBy === 'string' ? raw.handledBy : ((raw.handledBy as Record<string, unknown>)?.name ? String((raw.handledBy as Record<string, unknown>).name) : 'Unassigned'),
          addedDate:       String(raw.addedDate || new Date(String(raw.createdAt || raw.date || Date.now())).toLocaleDateString()),
          avatar:          String(raw.avatar || raw.name?.toString().substring(0, 2).toUpperCase() || 'NA'),
          source:          String(raw.source ?? 'Walk-in'),
          preferredBranch: String(raw.preferredBranch || raw.branch || 'Main Branch'),
          enquiryDate:     String(raw.enquiryDate || new Date(String(raw.createdAt || raw.date || Date.now())).toLocaleDateString()),
          followUps:       [],
          isOverdue:       false,
          isToday:         true,
          isUpcoming:      false,
        };
        setEnquiry(mapped);
        setCurrentStatus(mapped.status);
        setFetchState('success');
      })
      .catch(() => {
        // Rule 46: no console.error — error surfaced via fetchState
        setFetchState('error');
      });
  }, [id]);

  const {
    register: registerFU,
    handleSubmit: handleSubmitFU,
    reset: resetFU,
    formState: { errors: fuErrors, isSubmitting: fuSubmitting },
  } = useForm<FollowUpFormData>({
    resolver: zodResolver(followUpSchema),
    defaultValues: { date: '', remark: '' },
  });

  if (fetchState === 'loading') {
    return <div className="crm-page crm-empty-state"><div className="crm-spinner" /></div>;
  }

  if (fetchState === 'error' || !enquiry) {
    return (
      <div className="crm-page crm-empty-state crm-not-found">
        <XCircle size={48} className="crm-empty-icon" />
        <p className="crm-empty-title">Enquiry Not Found</p>
        <p className="crm-empty-sub">The enquiry with ID &ldquo;{id}&rdquo; does not exist.</p>
        <button
          className="crm-btn-ghost crm-mt-12"
          onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRIES)}
        >
          <ArrowLeft size={15} /> Back to Pipeline
        </button>
      </div>
    );
  }

  const handleStatusUpdate = async () => {
    setStatusUpdating(true);
    try {
      const res = await fetchApi(ADMIN_API_ROUTES.CRM_ENQUIRY_STATUS(id), {
        method: 'PATCH',
        body: JSON.stringify({ status: currentStatus }),
      }) as { message?: string };
      setEnquiry((prev) => (prev ? { ...prev, status: currentStatus } : prev));
      // Rule 14: display backend message
      toast.success(res?.message ?? 'Status updated', { className: 'crm-toast crm-toast--success' });
    } catch (err: unknown) {
      toast.error((err as { message?: string })?.message ?? 'Failed to update status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleAddFollowUp = async (formData: FollowUpFormData) => {
    try {
      const res = await fetchApi(ADMIN_API_ROUTES.CRM_ENQUIRY_FOLLOW_UPS(id), {
        method: 'POST',
        body: JSON.stringify({
          date: new Date(formData.date).toISOString(),
          remark: formData.remark,
          by: 'Admin',
        }),
      }) as { message?: string };
      const newEntry: FollowUp = {
        id:     `fu_${Date.now()}`,
        date:   new Date(formData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        time:   new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        by:     'Admin',
        remark: formData.remark,
      };
      setEnquiry((prev) => prev ? { ...prev, followUps: [newEntry, ...prev.followUps] } : prev);
      resetFU();
      // Rule 14: display backend message
      toast.success(res?.message ?? 'Follow-up added', { className: 'crm-toast crm-toast--success' });
    } catch (err: unknown) {
      toast.error((err as { message?: string })?.message ?? 'Failed to add follow-up');
    }
  };

  const handleConvert = () => {
    // Rule 67: navigate within admin module only — no /manager/ cross-module routes
    router.push(`${ADMIN_ROUTES.STUDENTS}/new?name=${encodeURIComponent(enquiry.name)}&phone=${encodeURIComponent(enquiry.phone)}`);
  };

  const handleMarkLostConfirm = async (reason: string) => {
    setLostSubmitting(true);
    try {
      const res = await fetchApi(ADMIN_API_ROUTES.CRM_ENQUIRY_STATUS(id), {
        method: 'PATCH',
        body: JSON.stringify({ status: 'Lost', reason }),
      }) as { message?: string };
      const lostEntry: FollowUp = {
        id:     `fu_${Date.now()}`,
        date:   new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        time:   new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        by:     'Admin',
        remark: reason ? `Marked as Lost — ${reason}` : 'Marked as Lost.',
      };
      setEnquiry((prev) => prev ? { ...prev, status: 'Lost', followUps: [lostEntry, ...prev.followUps] } : prev);
      setCurrentStatus('Lost');
      setShowLostModal(false);
      // Rule 14: display backend message
      toast(res?.message ?? 'Enquiry marked as lost', { icon: '❌', className: 'crm-toast crm-toast--danger' });
    } catch (err: unknown) {
      toast.error((err as { message?: string })?.message ?? 'Failed to mark as lost');
    } finally {
      setLostSubmitting(false);
    }
  };

  const statusBadgeCls = STATUS_BADGE[enquiry.status];

  const followUpDateClass = enquiry.isOverdue
    ? 'crm-followup-date-overdue'
    : enquiry.isToday
    ? 'crm-followup-date-today'
    : 'crm-followup-date-upcoming';

  const followUpDateLabel = enquiry.isOverdue ? 'Overdue' : enquiry.isToday ? 'Today' : 'Upcoming';

  return (
    <>
      <Toaster position="bottom-right" />

      {showLostModal && (
        <MarkLostModal
          onConfirm={handleMarkLostConfirm}
          onCancel={() => setShowLostModal(false)}
          isSubmitting={lostSubmitting}
        />
      )}

      <div className="crm-page">

        <div className="crm-detail-topbar">
          <button
            className="crm-btn-icon crm-btn-icon-back"
            onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRIES)}
            title="Back to Pipeline"
            aria-label="Back to pipeline"
          >
            <ArrowLeft size={18} />
          </button>
          <nav className="crm-breadcrumb">
            CRM &rsaquo; Enquiries &rsaquo;{' '}
            <span className="crm-breadcrumb-current">{enquiry.name}</span>
          </nav>
        </div>

        <div className="crm-detail-grid">

          {/* LEFT COLUMN */}
          <div className="crm-detail-left">

            <div className="crm-card">
              <div className="crm-lead-header">
                <div className="crm-avatar crm-avatar--lg">{getInitials(enquiry.name)}</div>
                <div className="crm-lead-header-body">
                  <div className="crm-lead-title-row">
                    <h1 className="crm-lead-name">{enquiry.name}</h1>
                    <span className={`crm-badge ${statusBadgeCls}`}>{enquiry.status}</span>
                  </div>
                  <p className="crm-lead-phone"><Phone size={13} />+91 {enquiry.phone}</p>
                </div>
              </div>
              <div className="crm-info-grid">
                <InfoItem icon={<Tag size={14} />}          label="Source"            value={enquiry.source} />
                <InfoItem icon={<Clock size={14} />}        label="Preferred Shift"   value={enquiry.shift} />
                <InfoItem icon={<User size={14} />}         label="Handled By"        value={enquiry.handledBy} />
                <InfoItem icon={<MapPin size={14} />}       label="Branch Preference" value={enquiry.preferredBranch} />
                <InfoItem icon={<CalendarDays size={14} />} label="Enquiry Date"      value={enquiry.enquiryDate} />
                <InfoItem icon={<Phone size={14} />}        label="Phone (masked)"    value={maskPhone(enquiry.phone)} />
              </div>
            </div>

            <div className="crm-card">
              <h2 className="crm-section-title">Activity Timeline</h2>
              {enquiry.followUps.length === 0 ? (
                <div className="crm-empty-state-sm">
                  <Clock size={32} className="crm-empty-icon" />
                  <p className="crm-empty-sub">No follow-ups recorded yet</p>
                </div>
              ) : (
                <div className="crm-timeline">
                  {enquiry.followUps.map((fu: FollowUp) => (
                    <div className="crm-timeline-entry" key={fu.id}>
                      <div className={`crm-timeline-dot ${timelineDotClass(fu.by)}`} />
                      <div className="crm-timeline-card">
                        <div className="crm-timeline-card-header">
                          <p className="crm-timeline-date">
                            {fu.date}
                            <span className="crm-timeline-time">{fu.time}</span>
                          </p>
                          <p className="crm-timeline-by">by {fu.by}</p>
                        </div>
                        <p className="crm-timeline-remark">{fu.remark}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="crm-detail-right">

            <div className="crm-card">
              <h3 className="crm-section-label">Current Status</h3>
              <div className="crm-status-row">
                <div className="crm-select-wrap">
                  <select
                    className="crm-select"
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value as EnquiryStatus)}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button
                  className="crm-btn-primary"
                  onClick={handleStatusUpdate}
                  disabled={statusUpdating || currentStatus === enquiry.status}
                >
                  {statusUpdating ? <span className="crm-spinner" /> : <CheckCircle size={14} />}
                  {statusUpdating ? 'Saving…' : 'Update'}
                </button>
              </div>
            </div>

            <div className="crm-card">
              <h3 className="crm-section-label">Add Follow-Up</h3>
              <form
                id="followup-form"
                onSubmit={handleSubmitFU(handleAddFollowUp)}
                noValidate
                className="crm-form-stack"
              >
                <div className="crm-field">
                  <label htmlFor="fu-date" className="crm-label crm-label--required">Follow-up Date</label>
                  <input
                    id="fu-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className={`crm-input crm-input-date${fuErrors.date ? ' crm-input--error' : ''}`}
                    {...registerFU('date')}
                  />
                  {fuErrors.date && <p className="crm-error">{fuErrors.date.message}</p>}
                </div>
                <div className="crm-field">
                  <label htmlFor="fu-remark" className="crm-label crm-label--required">Remark</label>
                  <textarea
                    id="fu-remark"
                    rows={3}
                    className={`crm-textarea${fuErrors.remark ? ' crm-textarea--error' : ''}`}
                    placeholder="What happened in this interaction?"
                    {...registerFU('remark')}
                  />
                  {fuErrors.remark && <p className="crm-error">{fuErrors.remark.message}</p>}
                </div>
                <button type="submit" className="crm-btn-primary crm-btn-full" disabled={fuSubmitting}>
                  {fuSubmitting ? <><span className="crm-spinner" /> Adding…</> : <><Plus size={15} /> Add Follow-Up</>}
                </button>
              </form>

              {(enquiry.isToday || enquiry.isUpcoming || enquiry.isOverdue) && (
                <>
                  <div className="crm-divider" />
                  <div className="crm-followup-next">
                    <div className="crm-followup-next-left">
                      <CalendarDays size={13} />
                      <span>Next follow-up:{' '}<strong className={followUpDateClass}>{followUpDateLabel}</strong></span>
                    </div>
                    <button className="crm-btn-icon" title="Edit follow-up date" aria-label="Edit follow-up date">
                      <Edit2 size={13} />
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="crm-card crm-form-stack">
              <h3 className="crm-section-label">Actions</h3>
              <button
                className="crm-btn-success crm-btn-full"
                onClick={handleConvert}
                disabled={enquiry.status === 'Converted'}
              >
                <CheckCircle size={16} />
                {enquiry.status === 'Converted' ? 'Already Converted' : 'Convert to Admission'}
              </button>
              <button
                className="crm-btn-danger crm-btn-full"
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
