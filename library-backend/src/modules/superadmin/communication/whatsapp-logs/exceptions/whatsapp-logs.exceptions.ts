import { HttpException, HttpStatus } from '@nestjs/common';
import { WHATSAPP_LOGS_CONSTANTS } from '../constants/whatsapp-logs.constants';

export class WhatsAppMessageNotFoundException extends HttpException {
  constructor(message: string = WHATSAPP_LOGS_CONSTANTS.ERRORS.WHATS_APP_MESSAGE_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
