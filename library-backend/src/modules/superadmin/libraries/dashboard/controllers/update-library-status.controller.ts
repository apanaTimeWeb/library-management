import { Controller, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateLibraryStatusService } from '@/modules/superadmin/libraries/dashboard/services/update-library-status.service';
import { UpdateLibraryStatusDto } from '@/modules/superadmin/dashboard/superadmin/dtos/update-library-status.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Superadmin Dashboard')
@ApiBearerAuth()
@Controller('api/superadmin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
@AuthRoles('superadmin')
export class UpdateLibraryStatusController {
  constructor(
    private readonly updateLibraryStatusService: UpdateLibraryStatusService,
  ) {}

  // SLA: FAST
  @Put('libraries/:id/status')
  @ApiOperation({ summary: 'Update library status' })
  async updateLibraryStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateLibraryStatusDto,
  ): Promise<any> {
    return await this.updateLibraryStatusService.updateLibraryStatus(
      id,
      updateDto,
    );
  }
}
