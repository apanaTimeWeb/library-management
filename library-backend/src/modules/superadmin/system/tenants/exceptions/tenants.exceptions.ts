import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { TENANT_ERRORS } from '../constants/tenants.constants';

export class TenantNotFoundException extends NotFoundException {
  constructor(message = TENANT_ERRORS.TENANT_NOT_FOUND) {
    super(message);
  }
}

export class TenantAlreadyExistsException extends ConflictException {
  constructor(message = TENANT_ERRORS.TENANT_ALREADY_EXISTS) {
    super(message);
  }
}

export class InvalidTenantStatusException extends BadRequestException {
  constructor(message = TENANT_ERRORS.INVALID_TENANT_STATUS) {
    super(message);
  }
}
