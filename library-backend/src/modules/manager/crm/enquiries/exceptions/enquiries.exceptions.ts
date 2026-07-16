import { HttpException, HttpStatus } from '@nestjs/common';
import { ENQUIRIES_CONSTANTS } from '@/modules/manager/crm/enquiries/constants/enquiries.constants';

export class EnquiryNotFoundException extends HttpException {
  constructor(message: string = ENQUIRIES_CONSTANTS.ERRORS.ENQUIRY_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
