import { HttpException, HttpStatus } from '@nestjs/common';
import { SHIFTS_CONSTANTS } from '../constants/shifts.constants';

export class ShiftNotFoundException extends HttpException {
  constructor(message: string = SHIFTS_CONSTANTS.ERRORS.SHIFT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
