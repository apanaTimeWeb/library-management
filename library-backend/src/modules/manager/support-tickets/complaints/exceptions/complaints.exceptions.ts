import { HttpException, HttpStatus } from '@nestjs/common';
import { COMPLAINTS_CONSTANTS } from '@/modules/manager/support-tickets/complaints/constants/complaints.constants';

export class ComplaintNotFoundException extends HttpException {
  constructor(message: string = COMPLAINTS_CONSTANTS.ERRORS.COMPLAINT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
