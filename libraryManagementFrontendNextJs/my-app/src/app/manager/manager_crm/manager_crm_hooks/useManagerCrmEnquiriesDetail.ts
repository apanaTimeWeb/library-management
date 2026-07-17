import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { EnquiryDetail, EnquiryStatus, FollowUp } from '@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes';
import { MANAGER_CRM_URL_CONFIG } from '@/app/manager/manager_crm/manager_crm_url_config';

export function useManagerCrmEnquiriesDetail(id: string) {
  const router = useRouter();

  const [enquiry, setEnquiry] = useState<EnquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<EnquiryStatus>('New');
  const [showLostModal, setShowLostModal] = useState(false);
  const [lostSubmitting, setLostSubmitting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    import('@/lib/api').then(({ fetchApi }) => {
      fetchApi<{id: string, name: string, phone: string, preferredShift: string, status: string, handledBy: {name: string}, createdAt: string, source: string, preferredBranch: string}>(/crm/enquiries/ + id)
        .then((e) => {
          if (!e) {
            setLoading(false);
            return;
          }
          const mapped: EnquiryDetail = {
            id: e.id,
            name: e.name,
            phone: e.phone || '',
            shift: e.preferredShift,
            status: e.status ? (e.status.charAt(0).toUpperCase() + e.status.slice(1)) : 'New',
            handledBy: e.handledBy?.name || 'Unassigned',
            enquiryDate: new Date(e.createdAt).toLocaleDateString(),
            avatar: String(e.name || 'U').substring(0, 2).toUpperCase(),
            source: e.source || 'Walk-in',
            preferredBranch: e.preferredBranch || 'Main Branch',
            followUps: [],
            isOverdue: false,
            isToday: true,
            isUpcoming: false,
          };
          setEnquiry(mapped);
          setCurrentStatus(mapped.status as EnquiryStatus);
          setLoading(false);
        })
        .catch(() => {
          toast.error('Failed to load enquiry data');
          setLoading(false);
        });
    });
  }, [id]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as EnquiryStatus;
    if (val === 'Lost') {
      setShowLostModal(true);
      return;
    }
    setCurrentStatus(val);
    setStatusUpdating(true);
    try {
      const { fetchApi } = await import('@/lib/api');
      await fetchApi(/crm/enquiries/ + id + /status, {
        method: 'PATCH',
        body: JSON.stringify({ status: val })
      });
      setEnquiry((prev) => (prev ? { ...prev, status: val } : prev));
      toast.success(Status updated to " + val + ");
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleAddFollowUp = async (formData: { date: string, remark: string }) => {
    try {
      const { fetchApi } = await import('@/lib/api');
      const payload = {
        date: new Date(formData.date).toISOString(),
        remark: formData.remark,
        by: 'Admin'
      };
      await fetchApi(/crm/enquiries/ + id + /follow-ups, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      const newEntry: FollowUp = {
        id: u_ + Date.now(),
        date: new Date(formData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        by: 'Admin',
        note: formData.remark,
      };
      setEnquiry((prev) => prev ? { ...prev, followUps: [newEntry, ...prev.followUps] } : prev);
      toast.success('Follow-up added!');
    } catch (err) {
      toast.error('Failed to add follow-up');
      throw err;
    }
  };

  const handleConvert = () => {
    if(enquiry) router.push(/manager/manager_students/new?name= + enquiry.name + &phone= + enquiry.phone);
  };

  const handleMarkLostConfirm = async (reason: string) => {
    setLostSubmitting(true);
    try {
      const { fetchApi } = await import('@/lib/api');
      await fetchApi(/crm/enquiries/ + id + /status, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'Lost', reason: reason })
      });

      const lostEntry: FollowUp = {
        id: u_ + Date.now(),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        by: 'Admin',
        note: reason ? Marked as Lost -  + reason : 'Marked as Lost.',
      };
      setEnquiry((prev) => prev ? { ...prev, status: 'Lost', followUps: [lostEntry, ...prev.followUps] } : prev);
      setCurrentStatus('Lost');
      setShowLostModal(false);
      toast('Enquiry marked as lost.');
    } catch (err) {
      toast.error('Failed to mark as lost');
    } finally {
      setLostSubmitting(false);
    }
  };

  return {
    enquiry,
    loading,
    currentStatus,
    showLostModal,
    setShowLostModal,
    lostSubmitting,
    statusUpdating,
    handleStatusChange,
    handleAddFollowUp,
    handleConvert,
    handleMarkLostConfirm
  };
}
