import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteAuditLogService } from '../services/delete-audit-log.service';

@Controller('api/v1/superadmin/audit-logs')
export class DeleteAuditLogController {
  constructor(private readonly service: DeleteAuditLogService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'AuditLog deleted successfully', data: null };
  }
}
