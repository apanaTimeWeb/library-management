import { Injectable } from '@nestjs/common';
import { ADMIN_CONSTANTS } from '../constants/admin.constants';

@Injectable()
export class AuditLogsService {
  async getAuditLogs() {
    return ADMIN_CONSTANTS.EMPTY_ARRAY;
  }
}
