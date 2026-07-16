import { HttpException, HttpStatus } from '@nestjs/common';
import { WHATSAPP_TEMPLATES_CONSTANTS } from '../constants/whatsapp-templates.constants';

export class WhatsAppTemplateNotFoundException extends HttpException {
  constructor(message: string = WHATSAPP_TEMPLATES_CONSTANTS.ERRORS.WHATS_APP_TEMPLATE_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
