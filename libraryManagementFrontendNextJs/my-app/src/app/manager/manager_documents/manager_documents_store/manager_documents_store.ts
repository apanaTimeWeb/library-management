import { create } from 'zustand';
import type { FetchState, DocumentRecord } from '@/app/manager/manager_documents/manager_documents_types/manager_documents_types';
import { DOCUMENTS_DATA } from '@/app/manager/manager_documents/manager_documents_constants/manager_documents_constants';


export interface ManagerDocumentsState {
  documents: DocumentRecord[];
  documentsStatus: FetchState;
  documentsError: string | null;
  fetchDocuments: () => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
}

// DATA FLOW: API -> Store -> Hook -> Component
export const useManagerDocumentsStore = create<ManagerDocumentsState>((set, get) => ({
  documents: DOCUMENTS_DATA,
  documentsStatus: 'idle',
  documentsError: null,

  fetchDocuments: async () => {
    // Simulated fetch
    set({ documentsStatus: 'loading' });
    setTimeout(() => {
      set({ documents: DOCUMENTS_DATA, documentsStatus: 'success' });
    }, 500);
  },

  deleteDocument: async (id) => {
    set((state) => ({
      documents: state.documents.filter(d => d.id !== id)
    }));
  }
}));
