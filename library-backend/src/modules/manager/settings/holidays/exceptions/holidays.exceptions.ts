import { HttpException, HttpStatus } from '@nestjs/common';
import { HOLIDAYS_CONSTANTS } from '@/modules/manager/settings/holidays/constants/holidays.constants';

export class HolidayNotFoundException extends HttpException {
  constructor(message: string = HOLIDAYS_CONSTANTS.ERRORS.HOLIDAY_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
