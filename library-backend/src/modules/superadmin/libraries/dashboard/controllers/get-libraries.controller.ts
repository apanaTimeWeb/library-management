import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetLibrariesService } from '@/modules/superadmin/libraries/dashboard/services/get-libraries.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Dashboard')
@ApiBearerAuth()
@Controller('api/superadmin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
export class GetLibrariesController {
  constructor(private readonly getLibrariesService: GetLibrariesService) {}

  @Get('libraries')
  @ApiOperation({ summary: 'Get all libraries/branches' })
  async getLibraries() {
    return await this.getLibrariesService.getLibraries();
  }
}
