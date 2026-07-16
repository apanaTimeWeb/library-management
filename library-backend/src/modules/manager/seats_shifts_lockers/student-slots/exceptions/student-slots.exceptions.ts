import { HttpException, HttpStatus } from '@nestjs/common';
import { STUDENT_SLOTS_CONSTANTS } from '../constants/student-slots.constants';

export class StudentSlotNotFoundException extends HttpException {
  constructor(message: string = STUDENT_SLOTS_CONSTANTS.ERRORS.STUDENT_SLOT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
