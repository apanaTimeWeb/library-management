import { Controller, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateLibraryService } from '@/modules/superadmin/libraries/dashboard/services/update-library.service';
import { UpdateLibraryDto } from '@/modules/superadmin/dashboard/superadmin/dtos/update-library.dto';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Dashboard')
@ApiBearerAuth()
@Controller('api/superadmin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
export class UpdateLibraryController {
  constructor(private readonly updateLibraryService: UpdateLibraryService) {}

  // SLA: FAST
  @Put('libraries/:id')
  @ApiOperation({ summary: 'Update library details' })
  async updateLibrary(
    @Param('id') id: string,
    @Body() updateDto: UpdateLibraryDto,
  ): Promise<any> {
    return await this.updateLibraryService.updateLibrary(id, updateDto);
  }
}
