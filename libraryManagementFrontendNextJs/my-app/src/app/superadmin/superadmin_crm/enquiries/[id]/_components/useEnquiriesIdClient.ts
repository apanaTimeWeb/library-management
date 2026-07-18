/**
 * RESPONSIBILITY: Logic and state management for Enquiries detail view.
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { logger } from '@/lib/logger';
import { SUPERADMIN_ROUTES, SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import type { Enquiry, EnquiryStatus, FollowUp } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/superadmin_types';
import { followUpSchema, type FollowUpFormData } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/superadmin_schema';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

export function useEnquiriesIdClient(id: string) {
  const router = useRouter();

  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<EnquiryStatus>('New');
  const [showLostModal, setShowLostModal] = useState(false);
  const [lostSubmitting, setLostSubmitting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    import('@/lib/api').then(({ fetchApi }) => {
      fetchApi(`${SUPERADMIN_API_ROUTES.CRM_ENQUIRIES}/${id}`)
        .then(( e: unknown ) => {
          if (!e || typeof e !== 'object') {
            setLoading(false);
            return;
          }
          const dataObj = e as Record<string, any>;
          const mapped: Enquiry = {
            id: String(dataObj.id || Math.random()),
            name: String(dataObj.name || 'Unknown'),
            phone: String(dataObj.phone || 'NA'),
            shift: String(dataObj.preferredShift || dataObj.shift || 'Morning'),
            status: (dataObj.status ? (String(dataObj.status).charAt(0).toUpperCase() + String(dataObj.status).slice(1)) : 'New') as EnquiryStatus,
            handledBy: (dataObj.handledBy && typeof dataObj.handledBy === 'object' && 'name' in dataObj.handledBy) ? String(dataObj.handledBy.name) : (typeof dataObj.handledBy === 'string' ? dataObj.handledBy : 'Unassigned'),
            addedDate: dataObj.createdAt ? new Date(String(dataObj.createdAt)).toLocaleDateString() : (dataObj.date ? new Date(String(dataObj.date)).toLocaleDateString() : new Date().toLocaleDateString()),
            avatar: String(dataObj.name || 'U').substring(0, 2).toUpperCase(),
            source: String(dataObj.source || 'Walk-in'),
            preferredBranch: String(dataObj.preferredBranch || 'Main Branch'),
            enquiryDate: dataObj.createdAt ? new Date(String(dataObj.createdAt)).toLocaleDateString() : '',
            followUps: [],
            isOverdue: false,
            isToday: true,
            isUpcoming: false,
          };
          setEnquiry(mapped);
          setCurrentStatus(mapped.status as EnquiryStatus);
          setLoading(false);
        })
        .catch((err) => {
          logger.error('Failed to load enquiry detail', err);
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
      await fetchApi(SUPERADMIN_API_ROUTES.CRM_ENQUIRIES_STATUS(id), {
        method: 'PATCH',
        body: JSON.stringify({ status: currentStatus })
      });
      setEnquiry((prev: Enquiry | null) => (prev ? { ...prev, status: currentStatus } : prev));
      toast.success(`Status updated to "${currentStatus}"`);
    } catch (err) {
      logger.error('Failed to update enquiry status', err);
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
      await fetchApi(SUPERADMIN_API_ROUTES.CRM_ENQUIRIES_FOLLOW_UPS(id), {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      const newEntry: FollowUp = {
        id: `fu_${Date.now()}`,
        date: new Date(formData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        by: 'Admin',
        remark: formData.remark,
      };
      setEnquiry((prev: Enquiry | null) => prev ? { ...prev, followUps: [newEntry, ...prev.followUps] } : prev);
      resetFU();
      toast.success('Follow-up added!');
    } catch (err) {
      logger.error('Failed to add follow-up', err);
      toast.error('Failed to add follow-up');
    }
  };

  const handleConvert = () => {
    if (!enquiry) return;
    router.push(`${SUPERADMIN_ROUTES.STUDENTS}?action=new&name=${encodeURIComponent(enquiry.name)}&phone=${encodeURIComponent(enquiry.phone)}`);
  };

  const handleMarkLostConfirm = async (reason: string) => {
    setLostSubmitting(true);
    try {
      const { fetchApi } = await import('@/lib/api');
      await fetchApi(SUPERADMIN_API_ROUTES.CRM_ENQUIRIES_STATUS(id), {
        method: 'PATCH',
        body: JSON.stringify({ status: 'Lost', reason: reason })
      });

      const lostEntry: FollowUp = {
        id: `fu_${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        by: 'Admin',
        remark: reason ? `Marked as Lost — ${reason}` : 'Marked as Lost.',
      };
      setEnquiry((prev: Enquiry | null) => prev ? { ...prev, status: 'Lost', followUps: [lostEntry, ...prev.followUps] } : prev);
      setCurrentStatus('Lost');
      setShowLostModal(false);
      toast.error('Enquiry marked as lost.');
    } catch (err) {
      logger.error('Failed to mark enquiry as lost', err);
      toast.error('Failed to mark as lost');
    } finally {
      setLostSubmitting(false);
    }
  };

  return {
    router,
    enquiry, loading,
    currentStatus, setCurrentStatus,
    showLostModal, setShowLostModal,
    lostSubmitting, statusUpdating,
    registerFU, handleSubmitFU, fuErrors, fuSubmitting,
    handleStatusUpdate, handleAddFollowUp, handleConvert, handleMarkLostConfirm
  };
}
