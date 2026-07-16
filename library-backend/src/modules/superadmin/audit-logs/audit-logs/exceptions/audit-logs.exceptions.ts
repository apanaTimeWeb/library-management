import { HttpException, HttpStatus } from '@nestjs/common';
import { AUDIT_LOGS_CONSTANTS } from '../constants/audit-logs.constants';

export class AuditLogNotFoundException extends HttpException {
  constructor(message: string = AUDIT_LOGS_CONSTANTS.ERRORS.AUDIT_LOG_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
