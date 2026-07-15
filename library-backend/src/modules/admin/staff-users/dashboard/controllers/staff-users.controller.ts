import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StaffUsersService } from '@/modules/admin/staff-users/dashboard/services/staff-users.service';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { TenantGuard } from '@/modules/auth/auth/guards/tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('superadmin', 'admin')
export class StaffUsersController {
  constructor(private readonly staffUsersService: StaffUsersService) {}

  // SLA: FAST
  @Get('staff-users')
  @ApiOperation({ summary: 'Get staff users' })
  async getStaffUsers(): Promise<any> {
    return this.staffUsersService.getStaffUsers();
  }
}
