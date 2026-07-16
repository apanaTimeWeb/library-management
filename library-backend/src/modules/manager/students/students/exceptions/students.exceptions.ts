import { HttpException, HttpStatus } from '@nestjs/common';
import { STUDENTS_CONSTANTS } from '../constants/students.constants';

export class StudentNotFoundException extends HttpException {
  constructor(message: string = STUDENTS_CONSTANTS.ERRORS.STUDENT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
