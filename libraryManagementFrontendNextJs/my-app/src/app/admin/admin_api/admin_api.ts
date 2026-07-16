import { StatusCodes } from 'http-status-codes';
import { ADMIN_API_ROUTES } from '../admin_url_config';
import type { ApiResponse } from '../admin_types/admin_types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

async function fetchWithEnvelope<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('access_token');
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {})
    };

    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) {
      let errorMsg = data.message || 'An error occurred during request.';
      if (typeof errorMsg === 'object' && errorMsg !== null) {
        errorMsg = errorMsg.message || JSON.stringify(errorMsg);
      }
      if (Array.isArray(errorMsg)) {
        errorMsg = errorMsg.join(', ');
      }
      return {
        success: false,
        message: errorMsg,
        error: data.error,
        statusCode: res.status,
        data: null
      };
    }
    
    // Check if backend already returns the envelope structure. If not, synthesize it.
    if ('success' in data && 'message' in data && 'data' in data) {
      return data as ApiResponse<T>;
    }
    
    return {
      success: true,
      message: data.message || 'Success',
      data: data as T,
      statusCode: res.status,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Network error occurred.',
      data: null,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    };
  }
}

/**
 * Fetches dashboard data.
 */
export async function fetchAdminDashboard(serverToken?: string): Promise<ApiResponse<any>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchWithEnvelope<any>(ADMIN_API_ROUTES.DASHBOARD, options);
}

/**
 * Fetches the list of students.
 */
export async function fetchAdminStudents(serverToken?: string): Promise<ApiResponse<any>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchWithEnvelope<any>(ADMIN_API_ROUTES.STUDENTS, options);
}

/**
 * Fetches the reports data.
 */
export async function fetchAdminReports(serverToken?: string): Promise<ApiResponse<any>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchWithEnvelope<any>(ADMIN_API_ROUTES.REPORTS, options);
}

