import { HttpException, HttpStatus } from '@nestjs/common';

export class EnquiryNotFoundException extends HttpException {
  constructor() {
    super('Enquiry not found', HttpStatus.NOT_FOUND);
  }
}
