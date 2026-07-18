'use client';
// RESPONSIBILITY: Renders detailed CRM enquiry page, including timelines and follow-up updates.
// RESPONSIBILITY: Renders detailed CRM enquiry page, including timelines and follow-up updates.
// RESPONSIBILITY: Renders the detail view for a specific enquiry, handling status updates and follow-ups.

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
  type EnquiryDetail,
  type EnquiryStatus,
  type FollowUp,
} from '@/app/manager/manager_crm/manager_crm_types';
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

/* ── Timeline dot color by staff ──────────────────────── */
function timelineDotClass(by: string): string {
  if (by === 'System') return 'crm-timeline-dot--system';
  const lower = by.toLowerCase();
  if (lower.includes('sarah')) return 'crm-timeline-dot--success';
  if (lower.includes('mike'))  return 'crm-timeline-dot--info';
  if (lower.includes('admin')) return 'crm-timeline-dot--warning';
  return '';
}

/* ── Mark Lost Modal ───────────────────────────────────── */
// Types and constants centralized. timeline?: Record<string, unknown>[]; isToday?: boolean; isUpcoming?: boolean; isOverdue?: boolean; avatar?: string;

/* ── Main Page ─────────────────────────────────────────── */
export function ManagerCrmEnquiriesDetailClient({ id }: { id: string }) {
  const router = useRouter();

  // ── Local state ──
  const [enquiry, setEnquiry] = useState<EnquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<EnquiryStatus>('New');
  const [showLostModal, setShowLostModal] = useState(false);
  const [lostSubmitting, setLostSubmitting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    import('@/lib/api').then(({ fetchApi }) => {
      fetchApi<{id: string, name: string, phone: string, preferredShift: string, status: string, handledBy: {name: string}, createdAt: string, source: string, preferredBranch: string}>(`/crm/enquiries/${id}`)
        .then((e) => {
          if (!e) {
            setLoading(false);
            return;
          }
          const mapped: EnquiryDetail = {
            id: e.id,
            name: e.name,
            phone: e.phone || '',
            email: e.email || '',
            shift: e.preferredShift,
            status: e.status ? (e.status.charAt(0).toUpperCase() + e.status.slice(1)) : 'New',
            handledBy: e.handledBy?.name || 'Unassigned',
            addedDate: e.createdAt,
            avatar: String(e.name || 'U').substring(0, 2).toUpperCase(),
            source: e.source || 'Walk-in',
            preferredBranch: e.preferredBranch || 'Main Branch',
            enquiryDate: new Date(e.createdAt).toLocaleDateString(),
            followUps: [],
            isOverdue: false,
            isToday: true,
            isUpcoming: false,
          } as EnquiryDetail;
          setEnquiry(mapped);
          setCurrentStatus(mapped.status as EnquiryStatus);
          setLoading(false);
        })
        .catch((err) => {
          logger.error('Failed to load enquiry detail', { id, message: err instanceof Error ? err.message : String(err) });
          setLoading(false);
        });
    });
  }, [id]);

  // ── Follow-up form ──
  const {
    register: registerFU,
    handleSubmit: handleSubmitFU,
    reset: resetFU,
    formState: { errors: fuErrors, isSubmitting: fuSubmitting },
  } = useForm<FollowUpFormData>({
    resolver: zodResolver(followUpSchema),
    defaultValues: { date: '', remark: '' },
  });

  /* ── Loading / Not found ── */
  if (loading) {
    return <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-full space-y-6 flex flex-col items-center justify-center text-center h-full"><p>Loading...</p></div>;
  }

  if (!enquiry) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-full space-y-6 flex flex-col items-center justify-center text-center h-full bg-bg-card border border-border rounded-xl">
        <XCircle size={48} className="text-text-secondary mb-4 mx-auto" />
        <p className="text-lg font-semibold text-text-primary mb-1">Enquiry Not Found</p>
        <p className="text-sm text-text-secondary mb-6">
          The enquiry with ID &ldquo;{id}&rdquo; does not exist.
        </p>
        <button
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-transparent text-text-primary border border-border hover:bg-border/40 transition-all mt-12"
          onClick={() => router.push(MANAGER_CRM_URLS.ENQUIRIES)}
        >
          <ArrowLeft size={15} />
          Back to Pipeline
        </button>
      </div>
    );
  }

  /* ── Handlers ── */
  const handleStatusUpdate = async () => {
    setStatusUpdating(true);
    try {
      const { fetchApi } = await import('@/lib/api');
      await fetchApi(`/crm/enquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: currentStatus })
      });
      setEnquiry((prev) => (prev ? { ...prev, status: currentStatus } : prev));
      toast.success(`Status updated to "${currentStatus}"`, {
        className: 'crm-toast crm-toast--success',
      });
    } catch (err) {
      logger.error('Failed to update enquiry status', { id, message: err instanceof Error ? err.message : String(err) });
      toast.error('Failed to update status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleAddFollowUp = async (formData: FollowUpFormData) => {
    try {
      const { fetchApi } = await import('@/lib/api');
      const payload = {
        date: new Date(formData.date).toISOString(),
        remark: formData.remark,
        by: 'Admin'
      };
      await fetchApi(`/crm/enquiries/${id}/follow-ups`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      const newEntry: FollowUp = {
        id: `fu_${Date.now()}`,
        date: new Date(formData.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        by: 'Admin',
        remark: formData.remark,
      };
      setEnquiry((prev) =>
        prev ? { ...prev, followUps: [newEntry, ...prev.followUps] } : prev
      );
      resetFU();
      toast.success('Follow-up added!', {
        className: 'crm-toast crm-toast--success',
      });
    } catch (err) {
      logger.error('Failed to add follow-up', { id, message: err instanceof Error ? err.message : String(err) });
      toast.error('Failed to add follow-up');
    }
  };

  const handleConvert = () => {
    router.push(
      MANAGER_CRM_URLS.QUICK_CONVERT(enquiry.name, enquiry.phone)
    );
  };

  const handleMarkLostConfirm = async (reason: string) => {
    setLostSubmitting(true);
    try {
      const { fetchApi } = await import('@/lib/api');
      await fetchApi(`/crm/enquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'Lost', reason: reason })
      });

      const lostEntry: FollowUp = {
        id: `fu_${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        by: 'Admin',
        remark: reason ? `Marked as Lost - ${reason}` : 'Marked as Lost.',
      };
      setEnquiry((prev) =>
        prev
          ? { ...prev, status: 'Lost', followUps: [lostEntry, ...prev.followUps] }
          : prev
      );
      setCurrentStatus('Lost');
      setShowLostModal(false);
      toast('Enquiry marked as lost.', {
        icon: '❌',
        className: 'crm-toast crm-toast--danger',
      });
    } catch (err) {
      logger.error('Failed to mark enquiry as lost', { id, message: err instanceof Error ? err.message : String(err) });
      toast.error('Failed to mark as lost');
    } finally {
      setLostSubmitting(false);
    }
  };

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
            className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors border border-border bg-bg-card shadow-sm hover:bg-border/40"
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

            {/* ── Info Card ── */}
            <div className="bg-bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-5 pb-6 border-b border-border mb-6">
                {/* Avatar */}
                <div className="rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-purple font-bold text-white shrink-0 w-16 h-16 text-xl shadow-lg shadow-primary/20">
                  {getInitials(enquiry.name)}
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold text-text-primary m-0 truncate">{enquiry.name}</h1>
                    <span className={`crm-badge ${statusBadgeCls}`}>{enquiry.status}</span>
                  </div>
                  <p className="flex items-center gap-1.5 text-sm text-text-secondary font-mono m-0">
                    <Phone size={13} />
                    +91 {enquiry.phone}
                  </p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <InfoItem icon={<Tag size={14} />}          label="Source"           value={enquiry.source} />
                <InfoItem icon={<Clock size={14} />}        label="Preferred Shift"  value={enquiry.shift} />
                <InfoItem icon={<User size={14} />}         label="Handled By"       value={enquiry.handledBy} />
                <InfoItem icon={<MapPin size={14} />}       label="Branch Preference" value={enquiry.preferredBranch} />
                <InfoItem icon={<CalendarDays size={14} />} label="Enquiry Date"     value={enquiry.enquiryDate} />
                <InfoItem icon={<Phone size={14} />}        label="Phone (masked)"   value={maskPhone(enquiry.phone)} />
              </div>
            </div>

            {/* ── Timeline ── */}
            <div className="bg-bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-[15px] font-bold text-text-primary mb-5 m-0">Activity Timeline</h2>

              {enquiry.followUps.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border rounded-xl bg-bg-elevated/50">
                  <Clock size={32} className="text-text-secondary mb-4 mx-auto" />
                  <p className="text-sm text-text-secondary mb-6">No follow-ups recorded yet</p>
                </div>
              ) : (
                <div className="relative pl-3 border-l-2 border-border/50 space-y-6">
                  {enquiry.followUps.map((fu: FollowUp) => (
                    <div className="relative" key={fu.id}>
                      <div className={`crm-timeline-dot ${timelineDotClass(fu.by)}`} />
                      <div className="bg-bg-input border border-border rounded-lg p-4 transition-colors hover:border-text-secondary">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-text-primary m-0 flex items-center gap-2">
                            {fu.date}
                            <span className="text-text-tertiary font-normal">{fu.time}</span>
                          </p>
                          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wider m-0">by {fu.by}</p>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed m-0">{fu.remark}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ══════════════════════════════
              RIGHT COLUMN  (40%) — sticky
          ══════════════════════════════ */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">

            {/* ── Status Update Card ── */}
            <div className="bg-bg-card border border-border rounded-xl p-6 shadow-sm">
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
            <div className="bg-bg-card border border-border rounded-xl p-6 shadow-sm">
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
                  <div className="h-px bg-border my-5" />
                  <div className="flex items-center justify-between bg-bg-elevated border border-border rounded-lg p-3">
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
            <div className="bg-bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
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




