import { Controller, Get, Query } from '@nestjs/common';
import { GetAllAuditLogsService } from '../services/get-all-audit-logs.service';
import { GetAuditLogsQueryDto } from '../dto/get-audit-logs-query.dto';

@Controller('api/v1/superadmin/audit-logs')
export class GetAllAuditLogsController {
  constructor(private readonly service: GetAllAuditLogsService) {}

  @Get()
  async handle(@Query() query: GetAuditLogsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'AuditLogs retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
