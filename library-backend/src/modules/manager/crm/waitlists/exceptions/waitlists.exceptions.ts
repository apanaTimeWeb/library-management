import { HttpException, HttpStatus } from '@nestjs/common';
import { WAITLISTS_CONSTANTS } from '../constants/waitlists.constants';

export class WaitlistNotFoundException extends HttpException {
  constructor(message: string = WAITLISTS_CONSTANTS.ERRORS.WAITLIST_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
