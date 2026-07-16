import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuditLogsService } from '@/modules/admin/audit-logs/dashboard/services/audit-logs.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  // SLA: FAST
  @Get('audit-logs')
  @ApiOperation({ summary: 'Get audit logs' })
  async getAuditLogs(): Promise<any> {
    return this.auditLogsService.getAuditLogs();
  }
}
