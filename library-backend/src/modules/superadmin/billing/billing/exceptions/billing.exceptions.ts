import { HttpException, HttpStatus } from '@nestjs/common';
import { BILLING_CONSTANTS } from '../constants/billing.constants';

export class BillingNotFoundException extends HttpException {
  constructor(message: string = BILLING_CONSTANTS.ERRORS.BILLING_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
