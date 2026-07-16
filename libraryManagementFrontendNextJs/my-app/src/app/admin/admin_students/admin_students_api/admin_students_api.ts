import { fetchApi } from '@/lib/api';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import type { ApiResponse } from '@/app/admin/admin_types/admin_types';
import type { 
  StudentListItem, 
  StudentDetailItem, 
  CreateStudentDto, 
  UpdateStudentDto 
} from '../admin_students_types/admin_students_types';

const route = ADMIN_API_ROUTES.STUDENTS;

/**
 * RESPONSIBILITY: Fetches the paginated list of students.
 */
export async function fetchAdminStudents(serverToken?: string): Promise<ApiResponse<StudentListItem[]>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(route, options);
}

/**
 * RESPONSIBILITY: Fetches details for a single student.
 */
export async function fetchAdminStudentById(id: string, serverToken?: string): Promise<ApiResponse<StudentDetailItem>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(`${route}/${id}`, options);
}

/**
 * RESPONSIBILITY: Creates a new student.
 */
export async function createAdminStudent(data: CreateStudentDto): Promise<ApiResponse<StudentDetailItem>> {
  return fetchApi(route, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * RESPONSIBILITY: Updates an existing student.
 */
export async function updateAdminStudent(id: string, data: UpdateStudentDto): Promise<ApiResponse<StudentDetailItem>> {
  return fetchApi(`${route}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * RESPONSIBILITY: Soft deletes a student.
 */
export async function deleteAdminStudent(id: string): Promise<ApiResponse<null>> {
  return fetchApi(`${route}/${id}`, {
    method: 'DELETE',
  });
}
