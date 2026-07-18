// RESPONSIBILITY: Global store for public module state (`Rule 5`).
// DATA FLOW: UI Component -> usePublicStore -> publicApi -> backend (`Rule 39`).

import { create } from 'zustand';
import { publicApi, type FetchState } from '@/app/public/public_api/public_api';
import type { PublicEnquiryFormData } from '@/app/public/enquiry/public_enquiry_types/PublicEnquiryValidation';
import { PublicStoreState } from "./public_store_types";

export const usePublicStore = create<PublicStoreState>((set) => ({
  fetchState: 'idle',
  errorMessage: null,

  submitEnquiry: async (payload) => {
    set({ fetchState: 'loading', errorMessage: null });
    const response = await publicApi.submitEnquiry(payload);
    
    if (response.success) {
      set({ fetchState: 'success' });
      return { success: true, message: response.message };
    } else {
      set({ fetchState: 'error', errorMessage: response.message });
      return { success: false, message: response.message };
    }
  },

  clearError: () => set({ errorMessage: null, fetchState: 'idle' }),
}));
