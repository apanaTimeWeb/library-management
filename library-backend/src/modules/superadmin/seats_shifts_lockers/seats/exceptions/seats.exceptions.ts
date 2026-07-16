import { HttpException, HttpStatus } from '@nestjs/common';
import { SEATS_CONSTANTS } from '../constants/seats.constants';

export class SeatNotFoundException extends HttpException {
  constructor(message: string = SEATS_CONSTANTS.ERRORS.SEAT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
