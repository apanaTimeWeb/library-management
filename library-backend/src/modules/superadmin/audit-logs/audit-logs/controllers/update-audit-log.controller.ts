import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateAuditLogService } from '../services/update-audit-log.service';
import { UpdateAuditLogDto } from '../dto/update-audit-log.dto';

@Controller('api/v1/superadmin/audit-logs')
export class UpdateAuditLogController {
  constructor(private readonly service: UpdateAuditLogService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateAuditLogDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'AuditLog updated successfully', data };
  }
}
