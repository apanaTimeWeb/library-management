import { useEffect } from 'react';
import { useManagerDocumentsStore } from '@/app/manager/manager_documents/manager_documents_store/manager_documents_store';

// DATA FLOW: API -> Store -> Hook -> Component

export function useManagerDocuments() {
  const { 
    documents, 
    documentsStatus, 
    documentsError, 
    fetchDocuments, 
    deleteDocument 
  } = useManagerDocumentsStore();

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    if (documentsStatus === 'idle') {
      fetchDocuments();
    }
  }, [documentsStatus, fetchDocuments]);

  return {
    documents,
    status: documentsStatus,
    error: documentsError,
    deleteDocument
  };
}
