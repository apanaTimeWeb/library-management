import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface PublicStoreState {
  fetchState: FetchState;
  errorMessage: string | null;
  
  // Actions
  submitEnquiry: (payload: PublicEnquiryFormData) => Promise<{ success: boolean; message: string }>;
  clearError: () => void;
}
