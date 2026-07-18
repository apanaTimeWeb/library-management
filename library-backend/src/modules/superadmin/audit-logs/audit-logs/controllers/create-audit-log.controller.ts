import { Controller, Post, Body } from '@nestjs/common';
import { CreateAuditLogService } from '../services/create-audit-log.service';
import { CreateAuditLogDto } from '../dto/create-audit-log.dto';

@Controller('api/v1/superadmin/audit-logs')
export class CreateAuditLogController {
  constructor(private readonly service: CreateAuditLogService) {}

  @Post()
  async handle(@Body() dto: CreateAuditLogDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'AuditLog created successfully', data };
  }
}
