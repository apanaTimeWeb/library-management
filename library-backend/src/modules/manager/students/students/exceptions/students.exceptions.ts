import { HttpException, HttpStatus } from '@nestjs/common';

export class StudentNotFoundException extends HttpException {
  constructor() {
    super('Student not found', HttpStatus.NOT_FOUND);
  }
}

export class BranchNotFoundException extends HttpException {
  constructor() {
    super('Branch not found', HttpStatus.NOT_FOUND);
  }
}
