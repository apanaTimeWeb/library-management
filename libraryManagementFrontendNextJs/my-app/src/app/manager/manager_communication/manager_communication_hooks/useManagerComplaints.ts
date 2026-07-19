// RESPONSIBILITY: Renders or handles logic for useManagerComplaints.ts.
import { useEffect } from 'react';
import { useManagerCommunicationStore } from '@/app/manager/manager_communication/manager_communication_store/manager_communication_store';

// DATA FLOW: API -> Store -> Hook -> Component

export function useManagerComplaints() {
  const { complaints, complaintsStatus, complaintsError, fetchComplaints, addComplaint, updateComplaintStatus } = useManagerCommunicationStore();

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
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

