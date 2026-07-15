import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { UpdateTenantService } from '../services/update-tenant.service';
import { UpdateTenantDto } from '../dto/update-tenant.dto';

@ApiTags('Superadmin Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/superadmin/system/tenants')
export class UpdateTenantController {
  constructor(private readonly updateTenantService: UpdateTenantService) {}

  // SLA: FAST
  @Patch(':id')
  @ApiOperation({ summary: 'Update a tenant' })
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ): Promise<any> {
    return this.updateTenantService.update(id, updateTenantDto);
  }
}
