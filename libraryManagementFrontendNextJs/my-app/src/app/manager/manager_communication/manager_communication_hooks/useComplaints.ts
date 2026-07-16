import { useEffect } from 'react';
import { useManagerCommunicationStore } from '@/app/manager/manager_communication/manager_communication_store/manager_communication_store';

// DATA FLOW: API -> Store -> Hook -> Component

export function useComplaints() {
  const { complaints, complaintsStatus, complaintsError, fetchComplaints, addComplaint, updateComplaintStatus } = useManagerCommunicationStore();

  useEffect(() => {
    if (complaintsStatus === 'idle') {
      fetchComplaints();
    }
  }, [complaintsStatus, fetchComplaints]);

  return {
    complaints,
    status: complaintsStatus,
    error: complaintsError,
    addComplaint,
    updateComplaintStatus
  };
}
