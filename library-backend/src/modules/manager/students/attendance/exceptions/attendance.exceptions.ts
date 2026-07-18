import { HttpException, HttpStatus } from '@nestjs/common';
import { ATTENDANCE_CONSTANTS } from '@/modules/manager/students/attendance/constants/attendance.constants';

export class AttendanceNotFoundException extends HttpException {
  constructor(message: string = ATTENDANCE_CONSTANTS.ERRORS.ATTENDANCE_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
