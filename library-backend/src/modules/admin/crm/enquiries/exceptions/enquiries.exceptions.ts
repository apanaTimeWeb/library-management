import { NotFoundException } from '@nestjs/common';
import { ADMIN_ENQUIRIES_CONSTANTS } from '@/modules/admin/crm/enquiries/constants/enquiries.constants';

export class EnquiryNotFoundException extends NotFoundException {
  constructor(id?: string) {
    super(id ? `Enquiry with ID ${id} not found` : ADMIN_ENQUIRIES_CONSTANTS.ENQUIRY_NOT_FOUND);
  }
}
