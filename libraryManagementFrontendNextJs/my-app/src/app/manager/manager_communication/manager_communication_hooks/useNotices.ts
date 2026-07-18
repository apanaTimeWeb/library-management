import { useEffect } from 'react';
import { useManagerCommunicationStore } from '@/app/manager/manager_communication/manager_communication_store/manager_communication_store';

// DATA FLOW: API -> Store -> Hook -> Component

export function useNotices() {
  const { notices, noticesStatus, noticesError, fetchNotices, addNotice, updateNotice, deleteNotice } = useManagerCommunicationStore();

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    if (noticesStatus === 'idle') {
      fetchNotices();
    }
  }, [noticesStatus, fetchNotices]);

  return {
    notices,
    status: noticesStatus,
    error: noticesError,
    addNotice,
    updateNotice,
    deleteNotice
  };
}
