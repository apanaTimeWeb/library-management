import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetLibrariesService } from '@/modules/superadmin/libraries/dashboard/services/get-libraries.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Superadmin Dashboard')
@ApiBearerAuth()
@Controller('api/superadmin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
@AuthRoles('superadmin')
export class GetLibrariesController {
  constructor(private readonly getLibrariesService: GetLibrariesService) {}

  // SLA: FAST
  @Get('libraries')
  @ApiOperation({ summary: 'Get all libraries/branches' })
  async getLibraries(): Promise<any> {
    return await this.getLibrariesService.getLibraries();
  }
}
