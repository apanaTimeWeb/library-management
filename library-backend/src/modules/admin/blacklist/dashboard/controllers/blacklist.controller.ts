import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BlacklistService } from '@/modules/admin/blacklist/dashboard/services/blacklist.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  // SLA: FAST
  @Get('blacklist')
  @ApiOperation({ summary: 'Get blacklist' })
  async getBlacklist(): Promise<any> {
    return this.blacklistService.getBlacklist();
  }
}
