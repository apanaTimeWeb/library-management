import { useEffect } from 'react';
import { useManagerDocumentsStore } from '@/app/manager/manager_documents/manager_documents_store/manager_documents_store';

// DATA FLOW: API -> Store -> Hook -> Component

export function useDocuments() {
  const { 
    documents, 
    documentsStatus, 
    documentsError, 
    fetchDocuments, 
    deleteDocument 
  } = useManagerDocumentsStore();

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
