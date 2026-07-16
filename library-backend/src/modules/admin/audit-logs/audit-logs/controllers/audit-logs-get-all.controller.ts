import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuditLogsGetAllService } from '../services/audit-logs-get-all.service';
import { AuditLogsQueryDto } from '../dto/audit-logs-query.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@Controller('admin/audit-logs')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
@AuthRoles('superadmin')
export class AuditLogsGetAllController {
  constructor(private readonly service: AuditLogsGetAllService) {}

  // SLA: FAST
  @Get()
  @ApiOperation({ summary: 'Get paginated audit logs (superadmin only)' })
  async handle(@Query() query: AuditLogsQueryDto) {
    const safeLimit = Math.min(query.limit ?? 50, 100);
    query.limit = safeLimit;

    const { items, total } = await this.service.execute(query);
    
    // Return standard response structure for pagination as expected by the interceptor
    return {
      data: items,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      }
    };
  }
}
