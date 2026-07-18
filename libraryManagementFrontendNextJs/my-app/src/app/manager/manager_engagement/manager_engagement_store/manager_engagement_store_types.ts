import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface ManagerEngagementState {
  attendance: StudentAttendance[];
  attendanceStatus: FetchState;
  attendanceError: string | null;

  fetchAttendance: () => Promise<void>;
  updateAttendanceStatus: (id: string, status: AttStatus) => void;
  updateAttendanceTime: (id: string, field: 'inTime'|'outTime', val: string) => void;
  saveAttendance: () => Promise<void>;
}
