import { StatusCodes } from 'http-status-codes';

import type { PublicEnquiryFormData } from '@/app/public/enquiry/_types/PublicEnquiryValidation';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode?: number;
}

export const publicApi = {
  submitEnquiry: async (_payload: PublicEnquiryFormData): Promise<ApiResponse<null>> => {
    try {
      // In a real app, this would hit the backend:
      // await fetchApi('/public/enquiry', { method: 'POST', body: JSON.stringify(payload) });
      
      // Simulating API call for now:
      await new Promise(resolve => setTimeout(resolve, 1200));

      return {
        success: true,
        message: 'Enquiry submitted successfully',
        data: null,
        statusCode: StatusCodes.CREATED,
      };
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        message: error.message || 'Error submitting enquiry',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },
};
