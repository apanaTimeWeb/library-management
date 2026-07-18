// RESPONSIBILITY: Provides logic for AttendanceClient
import { useState } from 'react';
import { SUPERADMIN_ENGAGEMENT_MOCK_ATTENDANCE } from '@/app/superadmin/superadmin_engagement/superadmin_engagement_data/SuperadminEngagementMockData';
import type { SuperadminEngagementStudent as Student, SuperadminEngagementAttStatus as AttStatus } from '@/app/superadmin/superadmin_engagement/superadmin_engagement_types/SuperadminEngagementTypes';

const today = new Date().toISOString().split('T')[0];

export function useAttendanceClient() {
  const [date, setDate]         = useState(today);
  const [shift, setShift]       = useState('All');
  const [students, setStudents] = useState<Student[]>(SUPERADMIN_ENGAGEMENT_MOCK_ATTENDANCE as Student[]);
  const [saved, setSaved]       = useState(false);
  const [alerted, setAlerted]   = useState<Set<string>>(new Set());

  const setStatus = (id: string, status: AttStatus) =>
    setStudents(p => p.map(( s ) => s.id === id ? { ...s, status } : s));

  const setField = (id: string, field: 'inTime'|'outTime', val: string) =>
    setStudents(p => p.map(( s ) => s.id === id ? { ...s, [field]: val } : s));

  const handleAlert = (id: string) => setAlerted(p => new Set(p).add(id));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return {
    date, setDate, shift, setShift, students, setStudents, saved, alerted,
    setStatus, setField, handleAlert, handleSave
  };
}
