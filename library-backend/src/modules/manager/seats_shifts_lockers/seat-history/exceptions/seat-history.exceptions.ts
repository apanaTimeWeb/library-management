import { HttpException, HttpStatus } from '@nestjs/common';
import { SEAT_HISTORY_CONSTANTS } from '../constants/seat-history.constants';

export class SeatHistoryNotFoundException extends HttpException {
  constructor(message: string = SEAT_HISTORY_CONSTANTS.ERRORS.SEAT_HISTORY_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
