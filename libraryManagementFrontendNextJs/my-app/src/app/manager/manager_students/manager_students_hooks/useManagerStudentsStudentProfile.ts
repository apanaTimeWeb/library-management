// RESPONSIBILITY: Renders or handles logic for useManagerStudentsStudentProfile.ts.
import { useEffect, useState } from 'react';
import { logger } from '@/lib/logger';
import { fetchStudentById } from '@/app/manager/manager_students/manager_students_api/manager_students_api';
import type { Student } from '@/app/manager/manager_students/manager_students_types';
import { calcExpiryDate } from '@/lib/whatsappUtils';

// DATA FLOW: Hook -> useManagerStudentsStudentProfile -> Consuming UI Component
export function useManagerStudentsStudentProfile(id: string) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    fetchStudentById(id)
      .then(data => {
        setStudent(data as Student);
        setLoading(false);
      })
      .catch(err => {
        logger.error('Failed to load student profile', { id, message: err instanceof Error ? err.message : String(err) });
        setLoading(false);
      });
  }, [id]);

  let joinDate = new Date();
  let expiryDate = new Date();

  if (student) {
    const [dd, mm, yyyy] = student.joined.split('/');
    joinDate = new Date(`${yyyy}-${mm}-${dd}`);
    expiryDate = calcExpiryDate(joinDate, student.plan);
  }

  return { student, loading, joinDate, expiryDate };
}

