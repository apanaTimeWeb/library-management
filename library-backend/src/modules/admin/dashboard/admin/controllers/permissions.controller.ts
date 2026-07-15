import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PermissionsService } from '../services/permissions.service';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { TenantGuard } from '../../../../auth/auth/guards/tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('superadmin', 'admin')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get('permissions')
  @ApiOperation({ summary: 'Get permissions' })
  async getPermissions(): Promise<any> {
    return this.permissionsService.getPermissions();
  }
}
