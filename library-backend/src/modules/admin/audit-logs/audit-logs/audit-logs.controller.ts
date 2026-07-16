import { Controller, Get, Query, UseGuards, ParseIntPipe, DefaultValuePipe,  } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, AuditLogsApiQuery,  } from '@nestjs/swagger';
import { AuditLogsAdminService } from './audit-logs.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@Controller('admin/audit-logs')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
@AuthRoles('superadmin')
export class AuditLogsAdminController {
  constructor(private readonly auditLogsService: AuditLogsAdminService) {}

  // SLA: FAST
  @Get()
  @ApiOperation({ summary: 'Get paginated audit logs (superadmin only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'tenantId', required: false, type: String })
  @ApiQuery({ name: 'entity', required: false, type: String })
  @ApiQuery({ name: 'action', required: false, type: String })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('tenantId') tenantId?: string,
    @Query('entity') entity?: string,
    @Query('action') action?: string,
  ): Promise<any> {
    // Cap limit to 100 max to prevent large data dumps
    const safeLimit = Math.min(limit, 100);
    return this.auditLogsService.findAll(
      page,
      safeLimit,
      tenantId,
      entity,
      action,
    );
  }
}
