import { HttpException, HttpStatus } from '@nestjs/common';
import { SECURITY_DEPOSITS_CONSTANTS } from '@/modules/manager/finance/security-deposits/constants/security-deposits.constants';

export class SecurityDepositNotFoundException extends HttpException {
  constructor(message: string = SECURITY_DEPOSITS_CONSTANTS.ERRORS.SECURITY_DEPOSIT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
