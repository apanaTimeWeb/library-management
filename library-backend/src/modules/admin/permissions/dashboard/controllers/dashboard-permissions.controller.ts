import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardPermissionsService } from '@/modules/admin/dashboard-permissions/dashboard/services/permissions.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardPermissionsController {
  constructor(private readonly permissionsService: DashboardPermissionsService) {}

  // SLA: FAST
  @Get('permissions')
  @ApiOperation({ summary: 'Get permissions' })
  async getPermissions(): Promise<any> {
    return this.permissionsService.getPermissions();
  }
}
