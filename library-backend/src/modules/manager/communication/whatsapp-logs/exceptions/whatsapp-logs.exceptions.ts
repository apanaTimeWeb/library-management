import { HttpException, HttpStatus } from '@nestjs/common';
import { WHATSAPP_LOGS_CONSTANTS } from '@/modules/manager/communication/whatsapp-logs/constants/whatsapp-logs.constants';

export class WhatsAppMessageNotFoundException extends HttpException {
  constructor(message: string = WHATSAPP_LOGS_CONSTANTS.ERRORS.WHATSAPP_LOG_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
