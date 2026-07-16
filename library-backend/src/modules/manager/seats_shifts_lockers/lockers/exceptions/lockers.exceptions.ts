import { HttpException, HttpStatus } from '@nestjs/common';
import { LOCKERS_CONSTANTS } from '@/modules/manager/seats_shifts_lockers/lockers/constants/lockers.constants';

export class LockerNotFoundException extends HttpException {
  constructor(message: string = LOCKERS_CONSTANTS.ERRORS.LOCKER_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
