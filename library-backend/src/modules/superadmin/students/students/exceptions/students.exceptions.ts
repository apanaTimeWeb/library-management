import { NotFoundException } from '@nestjs/common';
import { STUDENTS_ERRORS } from '../constants/students.constants';

export class StudentNotFoundException extends NotFoundException {
  constructor() {
    super(STUDENTS_ERRORS.STUDENT_NOT_FOUND);
  }
}

export class BranchNotFoundException extends NotFoundException {
  constructor() {
    super(STUDENTS_ERRORS.BRANCH_NOT_FOUND);
  }
}
