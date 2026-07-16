import { Controller, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateLibraryService } from '@/modules/superadmin/libraries/dashboard/services/update-library.service';
import { UpdateLibraryDto } from '@/modules/superadmin/dashboard/superadmin/dtos/update-library.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Superadmin Dashboard')
@ApiBearerAuth()
@Controller('api/superadmin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
@AuthRoles('superadmin')
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
