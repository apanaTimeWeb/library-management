import { HttpException, HttpStatus } from '@nestjs/common';
import { PAYMENTS_CONSTANTS } from '@/modules/manager/finance/payments/constants/payments.constants';

export class PaymentNotFoundException extends HttpException {
  constructor(message: string = PAYMENTS_CONSTANTS.ERRORS.PAYMENT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
