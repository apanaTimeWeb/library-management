import { Controller, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateLibraryStatusService } from '@/modules/superadmin/libraries/dashboard/services/update-library-status.service';
import { UpdateLibraryStatusDto } from '@/modules/superadmin/dashboard/superadmin/dtos/update-library-status.dto';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Dashboard')
@ApiBearerAuth()
@Controller('api/superadmin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
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
