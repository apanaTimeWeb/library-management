import { Controller, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateLibraryService } from '../services/update-library.service';
import { UpdateLibraryDto } from '../dtos/update-library.dto';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Dashboard')
@ApiBearerAuth()
@Controller('api/superadmin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
export class UpdateLibraryController {
  constructor(private readonly updateLibraryService: UpdateLibraryService) {}

  @Put('libraries/:id')
  @ApiOperation({ summary: 'Update library details' })
  async updateLibrary(
    @Param('id') id: string,
    @Body() updateDto: UpdateLibraryDto
  ) {
    return await this.updateLibraryService.updateLibrary(id, updateDto);
  }
}
