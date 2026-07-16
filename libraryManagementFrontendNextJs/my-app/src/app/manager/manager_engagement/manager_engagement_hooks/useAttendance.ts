import { useEffect } from 'react';
import { useManagerEngagementStore } from '@/app/manager/manager_engagement/manager_engagement_store/manager_engagement_store';

// DATA FLOW: API -> Store -> Hook -> Component

export function useAttendance() {
  const { 
    attendance, 
    attendanceStatus, 
    attendanceError, 
    fetchAttendance, 
    updateAttendanceStatus, 
    updateAttendanceTime, 
    saveAttendance 
  } = useManagerEngagementStore();

  useEffect(() => {
    if (attendanceStatus === 'idle') {
      fetchAttendance();
    }
  }, [attendanceStatus, fetchAttendance]);

  return {
    students: attendance,
    status: attendanceStatus,
    error: attendanceError,
    updateAttendanceStatus,
    updateAttendanceTime,
    saveAttendance
  };
}
