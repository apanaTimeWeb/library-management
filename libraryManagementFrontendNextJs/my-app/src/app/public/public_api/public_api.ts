import { StatusCodes } from 'http-status-codes';

import type { PublicEnquiryFormData } from '@/app/public/enquiry/public_enquiry_types/PublicEnquiryValidation';

import { PUBLIC_API_ENDPOINTS } from '@/app/public/public_url_config';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode?: number;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export const publicApi = {
  submitEnquiry: async (_payload: PublicEnquiryFormData): Promise<ApiResponse<null>> => {
    try {
      // In a real app, this would hit the backend:
      // await fetchApi(PUBLIC_API_ENDPOINTS.SUBMIT_ENQUIRY, { method: 'POST', body: JSON.stringify(_payload) });
      
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
