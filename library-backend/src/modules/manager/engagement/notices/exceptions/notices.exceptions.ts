import { HttpException, HttpStatus } from '@nestjs/common';
import { NOTICES_CONSTANTS } from '../constants/notices.constants';

export class NoticeNotFoundException extends HttpException {
  constructor(message: string = NOTICES_CONSTANTS.ERRORS.NOTICE_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
