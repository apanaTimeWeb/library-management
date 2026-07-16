import { HttpException, HttpStatus } from '@nestjs/common';
import { TENANTS_CONSTANTS } from '../constants/tenants.constants';

export class TenantNotFoundException extends HttpException {
  constructor(message: string = TENANTS_CONSTANTS.ERRORS.TENANT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
