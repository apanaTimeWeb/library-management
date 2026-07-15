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
