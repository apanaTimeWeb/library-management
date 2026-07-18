// RESPONSIBILITY: Renders the admin_staff-users_api.ts component/hook.
import { fetchApi } from '@/lib/api';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import type { ApiResponse } from '@/app/admin/admin_types/admin_types';
import type { 
  IUser, 
  CreateUserDto, 
  UpdateUserDto 
} from '@/app/admin/admin_staff-users/admin_staff-users_types/admin_staff-users_types';

const route = ADMIN_API_ROUTES.STAFF_USERS;

/**
 * RESPONSIBILITY: Fetches the paginated list of staff users.
 */
export async function fetchAdminStaffUsers(serverToken?: string): Promise<ApiResponse<IUser[]>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(route, options);
}

/**
 * RESPONSIBILITY: Fetches details for a single staff user.
 */
export async function fetchAdminStaffUserById(id: string, serverToken?: string): Promise<ApiResponse<IUser>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(`${route}/${id}`, options);
}

/**
 * RESPONSIBILITY: Creates a new staff user.
 */
export async function createAdminStaffUser(data: CreateUserDto): Promise<ApiResponse<IUser>> {
  return fetchApi(route, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * RESPONSIBILITY: Updates an existing staff user.
 */
export async function updateAdminStaffUser(id: string, data: UpdateUserDto): Promise<ApiResponse<IUser>> {
  return fetchApi(`${route}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * RESPONSIBILITY: Soft deletes a staff user.
 */
export async function deleteAdminStaffUser(id: string): Promise<ApiResponse<null>> {
  return fetchApi(`${route}/${id}`, {
    method: 'DELETE',
  });
}

