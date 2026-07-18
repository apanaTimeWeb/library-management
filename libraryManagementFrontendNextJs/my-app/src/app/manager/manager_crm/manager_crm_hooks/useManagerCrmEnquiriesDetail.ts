import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { logger } from '@/lib/logger';
import { MANAGER_CRM_URLS } from '@/app/manager/manager_crm/manager_crm_url_config';
import { type EnquiryStatus, type FollowUp, type EnquiryDetail } from '@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes';
import { followUpSchema, type FollowUpFormData } from '@/app/manager/manager_crm/manager_crm_shared_components/manager_crm_schema';

// DATA FLOW: Hook -> useManagerCrmEnquiriesDetail -> Consuming UI Component
export function useManagerCrmEnquiriesDetail(id: string) {
  const router = useRouter();

  const [enquiry, setEnquiry] = useState<EnquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<EnquiryStatus>('New');
  const [showLostModal, setShowLostModal] = useState(false);
  const [lostSubmitting, setLostSubmitting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    import('@/lib/api').then(({ fetchApi }) => {
      fetchApi<{id: string, name: string, phone: string, email?: string, preferredShift: string, status: string, handledBy: {name: string}, createdAt: string, source: string, preferredBranch: string}>(`/crm/enquiries/${id}`)
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

  const {
    register: registerFU,
    handleSubmit: handleSubmitFU,
    reset: resetFU,
    formState: { errors: fuErrors, isSubmitting: fuSubmitting },
  } = useForm<FollowUpFormData>({
    resolver: zodResolver(followUpSchema),
    defaultValues: { date: '', remark: '' },
  });

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

  const onSubmitFU = async (formData: FollowUpFormData) => {
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
      
      const newEntry = {
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
        prev ? { ...prev, followUps: [newEntry as FollowUp, ...prev.followUps] } : prev
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
    if (enquiry) {
      router.push(MANAGER_CRM_URLS.QUICK_CONVERT(enquiry.name, enquiry.phone));
    }
  };

  const handleMarkLostConfirm = async (reason: string) => {
    setLostSubmitting(true);
    try {
      const { fetchApi } = await import('@/lib/api');
      await fetchApi(`/crm/enquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'Lost', reason: reason })
      });

      const lostEntry = {
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
          ? { ...prev, status: 'Lost', followUps: [lostEntry as FollowUp, ...prev.followUps] }
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

  return {
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
  };
}
