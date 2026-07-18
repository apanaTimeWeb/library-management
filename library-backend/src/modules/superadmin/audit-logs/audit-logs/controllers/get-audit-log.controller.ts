import { Controller, Get, Param } from '@nestjs/common';
import { GetAuditLogService } from '../services/get-audit-log.service';

@Controller('api/v1/superadmin/audit-logs')
export class GetAuditLogController {
  constructor(private readonly service: GetAuditLogService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'AuditLog retrieved successfully', data };
  }
}
