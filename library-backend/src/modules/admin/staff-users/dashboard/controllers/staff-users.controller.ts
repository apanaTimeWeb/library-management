import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StaffUsersService } from '@/modules/admin/staff-users/dashboard/services/staff-users.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class StaffUsersController {
  constructor(private readonly staffUsersService: StaffUsersService) {}

  // SLA: FAST
  @Get('staff-users')
  @ApiOperation({ summary: 'Get staff users' })
  async getStaffUsers(): Promise<any> {
    return this.staffUsersService.getStaffUsers();
  }
}
