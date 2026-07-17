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
import { ADMIN_CRM_ENQUIRIES_STATUS_OPTIONS } from '@/app/admin/admin_crm/admin_crm_constants/AdminCrmConstants';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

// Rule 44: FetchState enum — no boolean loading flags
type FetchState = 'idle' | 'loading' | 'success' | 'error';

function timelineDotClass(by: string): string {
  if (by === 'System') return 'bg-muted-foreground';
  const lower = by.toLowerCase();
  if (lower.includes('sarah')) return 'bg-success';
  if (lower.includes('mike'))  return 'bg-info';
  if (lower.includes('admin')) return 'bg-warning';
  return 'bg-primary';
}

interface MarkLostModalProps {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isOpen: boolean;
}

function MarkLostModal({ onConfirm, onCancel, isSubmitting, isOpen }: MarkLostModalProps) {
  const { register, handleSubmit } = useForm<MarkLostFormData>({
    resolver: zodResolver(markLostSchema),
    defaultValues: { reason: '' },
  });
  const onSubmit = (d: MarkLostFormData) => onConfirm(d.reason ?? '');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-danger/10 text-danger p-2 rounded-full shrink-0">
              <AlertTriangle size={22} />
            </div>
            <div>
              <DialogTitle className="text-lg">Mark as Lost?</DialogTitle>
              <DialogDescription className="mt-1">
                This will move the enquiry to the <strong className="text-danger font-semibold">Lost</strong> column.
                You can still view the full history and re-open it later.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form id="mark-lost-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="lost-reason" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Reason <span className="lowercase font-normal opacity-70">(optional)</span>
            </label>
            <Textarea
              id="lost-reason"
              rows={3}
              placeholder="e.g. Didn't respond after 3 follow-ups…"
              {...register('reason')}
            />
          </div>
        </form>
        <DialogFooter className="flex flex-row gap-2 mt-2">
          <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            type="submit"
            form="mark-lost-form"
            variant="destructive"
            className="flex-1 gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <><XCircle size={15} /> Mark as Lost</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
        <span className="text-muted-foreground/70">{icon}</span> {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
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
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground font-medium">Loading enquiry details…</p>
      </div>
    );
  }

  if (fetchState === 'error' || !enquiry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-4">
        <XCircle size={48} className="text-muted-foreground opacity-20" />
        <p className="text-xl font-bold">Enquiry Not Found</p>
        <p className="text-sm text-muted-foreground">The enquiry with ID &ldquo;{id}&rdquo; does not exist.</p>
        <Button variant="ghost" className="mt-8 gap-2" onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRIES)}>
          <ArrowLeft size={15} /> Back to Pipeline
        </Button>
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
      toast.success(res?.message ?? 'Status updated');
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
      toast.success(res?.message ?? 'Follow-up added');
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
      toast(res?.message ?? 'Enquiry marked as lost', { icon: '❌' });
    } catch (err: unknown) {
      toast.error((err as { message?: string })?.message ?? 'Failed to mark as lost');
    } finally {
      setLostSubmitting(false);
    }
  };

  const getBadgeClass = (s: EnquiryStatus) => {
    switch (s) {
      case 'New': return 'bg-info/10 text-info';
      case 'Visited': return 'bg-primary/10 text-primary';
      case 'Interested': return 'bg-warning/10 text-warning';
      case 'Converted': return 'bg-success/10 text-success';
      case 'Lost': return 'bg-danger/10 text-danger';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const followUpDateClass = enquiry.isOverdue
    ? 'text-danger'
    : enquiry.isToday
    ? 'text-warning'
    : 'text-success';

  const followUpDateLabel = enquiry.isOverdue ? 'Overdue' : enquiry.isToday ? 'Today' : 'Upcoming';

  return (
    <>
      <Toaster position="bottom-right" />

      <MarkLostModal
        isOpen={showLostModal}
        onConfirm={handleMarkLostConfirm}
        onCancel={() => setShowLostModal(false)}
        isSubmitting={lostSubmitting}
      />

      <div className="space-y-6 pb-24 max-w-7xl mx-auto">

        {/* ── Topbar ── */}
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRIES)} className="text-muted-foreground">
            <ArrowLeft size={18} />
          </Button>
          <nav className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            CRM <span className="opacity-50">›</span> Enquiries <span className="opacity-50">›</span>
            <span className="text-foreground font-bold">{enquiry.name}</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* LEFT COLUMN */}
          <div className="flex-1 w-full space-y-6 lg:max-w-4xl">

            {/* Lead Info Card */}
            <Card className="shadow-sm border-border">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                  <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl shrink-0">
                    {getInitials(enquiry.name)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h1 className="text-2xl font-bold tracking-tight">{enquiry.name}</h1>
                      <Badge variant="secondary" className={`${getBadgeClass(enquiry.status)} border-none uppercase tracking-wider px-2 py-0.5`}>
                        {enquiry.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground font-medium flex items-center gap-1.5"><Phone size={14} className="text-muted-foreground/70" />+91 {enquiry.phone}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
                  <InfoItem icon={<Tag size={14} />}          label="Source"            value={enquiry.source} />
                  <InfoItem icon={<Clock size={14} />}        label="Preferred Shift"   value={enquiry.shift} />
                  <InfoItem icon={<User size={14} />}         label="Handled By"        value={enquiry.handledBy} />
                  <InfoItem icon={<MapPin size={14} />}       label="Branch Preference" value={enquiry.preferredBranch} />
                  <InfoItem icon={<CalendarDays size={14} />} label="Enquiry Date"      value={enquiry.enquiryDate} />
                  <InfoItem icon={<Phone size={14} />}        label="Phone (masked)"    value={maskPhone(enquiry.phone)} />
                </div>
              </CardContent>
            </Card>

            {/* Timeline Card */}
            <Card className="shadow-sm border-border">
              <CardHeader className="border-b border-border bg-muted/20 pb-4">
                <CardTitle className="text-lg">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {enquiry.followUps.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
                    <Clock size={40} className="opacity-20" />
                    <p className="font-medium text-sm">No follow-ups recorded yet</p>
                  </div>
                ) : (
                  <div className="relative border-l-2 border-border/50 ml-3 md:ml-4 space-y-6">
                    {enquiry.followUps.map((fu: FollowUp) => (
                      <div className="relative pl-6 md:pl-8 group" key={fu.id}>
                        <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-background ${timelineDotClass(fu.by)} shadow-sm group-hover:scale-110 transition-transform`} />
                        <Card className="shadow-none border-border/50 bg-muted/10 hover:bg-muted/30 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <p className="text-sm font-bold text-foreground flex items-center gap-2">
                                {fu.date}
                                <span className="text-xs font-mono font-normal text-muted-foreground bg-background px-1.5 py-0.5 rounded-md border border-border">{fu.time}</span>
                              </p>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">by {fu.by}</p>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed">{fu.remark}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-[350px] shrink-0 space-y-6">

            {/* Status Card */}
            <Card className="shadow-sm border-border">
              <CardHeader className="pb-3 border-b border-border bg-muted/20">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Current Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex-1 font-semibold"
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value as EnquiryStatus)}
                  >
                    {ADMIN_CRM_ENQUIRIES_STATUS_OPTIONS.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                  <Button
                    onClick={handleStatusUpdate}
                    disabled={statusUpdating || currentStatus === enquiry.status}
                    className="gap-2"
                  >
                    {statusUpdating ? <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" /> : <CheckCircle size={15} />}
                    {statusUpdating ? 'Saving…' : 'Update'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Add Follow-Up Card */}
            <Card className="shadow-sm border-border">
              <CardHeader className="pb-3 border-b border-border bg-muted/20">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Add Follow-Up</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <form
                  id="followup-form"
                  onSubmit={handleSubmitFU(handleAddFollowUp)}
                  noValidate
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label htmlFor="fu-date" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Follow-up Date *</label>
                    <Input
                      id="fu-date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className={fuErrors.date ? 'border-danger focus-visible:ring-danger' : ''}
                      {...registerFU('date')}
                    />
                    {fuErrors.date && <p className="text-xs text-danger font-medium mt-1">{fuErrors.date.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="fu-remark" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Remark *</label>
                    <Textarea
                      id="fu-remark"
                      rows={3}
                      className={fuErrors.remark ? 'border-danger focus-visible:ring-danger' : ''}
                      placeholder="What happened in this interaction?"
                      {...registerFU('remark')}
                    />
                    {fuErrors.remark && <p className="text-xs text-danger font-medium mt-1">{fuErrors.remark.message}</p>}
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={fuSubmitting}>
                    {fuSubmitting ? <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" /> : <Plus size={15} />}
                    {fuSubmitting ? 'Adding…' : 'Add Follow-Up'}
                  </Button>
                </form>

                {(enquiry.isToday || enquiry.isUpcoming || enquiry.isOverdue) && (
                  <>
                    <div className="h-px bg-border my-5" />
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                        <CalendarDays size={14} className="text-muted-foreground" />
                        <span>Next follow-up: <strong className={followUpDateClass}>{followUpDateLabel}</strong></span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <Edit2 size={13} />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card className="shadow-sm border-border">
              <CardHeader className="pb-3 border-b border-border bg-muted/20">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button
                  className="w-full bg-success hover:bg-success/90 text-white gap-2 font-bold"
                  onClick={handleConvert}
                  disabled={enquiry.status === 'Converted'}
                >
                  <CheckCircle size={16} />
                  {enquiry.status === 'Converted' ? 'Already Converted' : 'Convert to Admission'}
                </Button>
                <Button
                  variant="destructive"
                  className="w-full gap-2 font-bold"
                  onClick={() => setShowLostModal(true)}
                  disabled={enquiry.status === 'Lost'}
                >
                  <XCircle size={15} />
                  {enquiry.status === 'Lost' ? 'Already Marked Lost' : 'Mark as Lost'}
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
}
