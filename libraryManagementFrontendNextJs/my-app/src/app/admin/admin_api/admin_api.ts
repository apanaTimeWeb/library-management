import { StatusCodes } from 'http-status-codes';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import type { ApiResponse } from '@/app/admin/admin_types/admin_types';
import { fetchApi } from '@/lib/api';

/**
 * Fetches dashboard data.
 */
export async function fetchAdminDashboard(serverToken?: string): Promise<ApiResponse<unknown>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(ADMIN_API_ROUTES.DASHBOARD, options);
}

/**
 * Fetches the list of students.
 */
export async function fetchAdminStudents(serverToken?: string): Promise<ApiResponse<unknown>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(ADMIN_API_ROUTES.STUDENTS, options);
}

/**
 * Fetches the reports data.
 */
export async function fetchAdminReports(serverToken?: string): Promise<ApiResponse<unknown>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(ADMIN_API_ROUTES.REPORTS, options);
}

/**
 * Fetches the branches data.
 */
export async function fetchAdminBranches(serverToken?: string): Promise<ApiResponse<unknown>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(ADMIN_API_ROUTES.BRANCHES, options);
}

/**
 * Fetches the staff users data.
 */
export async function fetchAdminStaffUsers(serverToken?: string): Promise<ApiResponse<unknown>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(ADMIN_API_ROUTES.STAFF_USERS, options);
}

/**
 * Fetches the permissions data.
 */
export async function fetchAdminPermissions(serverToken?: string): Promise<ApiResponse<unknown>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(ADMIN_API_ROUTES.PERMISSIONS, options);
}

/**
 * Fetches the settings data.
 */
export async function fetchAdminSettings(serverToken?: string): Promise<ApiResponse<unknown>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(ADMIN_API_ROUTES.SETTINGS, options);
}
