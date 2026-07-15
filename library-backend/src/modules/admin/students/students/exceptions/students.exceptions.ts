import { NotFoundException } from '@nestjs/common';
import { ADMIN_STUDENTS_CONSTANTS } from '../constants/students.constants';

export class StudentNotFoundException extends NotFoundException {
  constructor() {
    super(ADMIN_STUDENTS_CONSTANTS.STUDENT_NOT_FOUND);
  }
}

export class BranchNotFoundException extends NotFoundException {
  constructor() {
    super(ADMIN_STUDENTS_CONSTANTS.BRANCH_NOT_FOUND);
  }
}

export class ShiftNotFoundException extends NotFoundException {
  constructor() {
    super(ADMIN_STUDENTS_CONSTANTS.SHIFT_NOT_FOUND);
  }
}

export class SeatNotFoundException extends NotFoundException {
  constructor() {
    super(ADMIN_STUDENTS_CONSTANTS.SEAT_NOT_FOUND);
  }
}

export class PlanNotFoundException extends NotFoundException {
  constructor() {
    super(ADMIN_STUDENTS_CONSTANTS.PLAN_NOT_FOUND);
  }
}
