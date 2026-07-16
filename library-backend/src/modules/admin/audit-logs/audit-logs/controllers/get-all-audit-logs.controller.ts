import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllAuditLogsService } from '../services/get-all-audit-logs.service';
import { GetAuditLogsQueryDto } from '../dto/get-audit-logs-query.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@Controller('admin/audit-logs')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
@AuthRoles('superadmin')
export class GetAllAuditLogsController {
  constructor(private readonly service: GetAllAuditLogsService) {}

  // SLA: FAST
  @Get()
  @ApiOperation({ summary: 'Get paginated audit logs (superadmin only)' })
  async handle(@Query() query: GetAuditLogsQueryDto) {
    // Cap limit to 100 max to prevent large data dumps
    const safeLimit = Math.min(query.limit ?? 50, 100);
    query.limit = safeLimit;

    const { items, total } = await this.service.execute(query);
    
    return {
      success: true,
      message: 'Audit logs retrieved successfully',
      data: items,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }
}
