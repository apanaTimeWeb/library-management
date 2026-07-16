import { HttpException, HttpStatus } from '@nestjs/common';
import { BLACKLIST_CONSTANTS } from '../constants/blacklist.constants';

export class BlacklistNotFoundException extends HttpException {
  constructor(message: string = BLACKLIST_CONSTANTS.ERRORS.BLACKLIST_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
