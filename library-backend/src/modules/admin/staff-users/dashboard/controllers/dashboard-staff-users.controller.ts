import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardStaffUsersService } from '@/modules/admin/dashboard-staff-users/dashboard/services/staff-users.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardStaffUsersController {
  constructor(private readonly staffUsersService: DashboardStaffUsersService) {}

  // SLA: FAST
  @Get('staff-users')
  @ApiOperation({ summary: 'Get staff users' })
  async getStaffUsers(): Promise<any> {
    return this.staffUsersService.getStaffUsers();
  }
}
