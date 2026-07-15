import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { GetTenantService } from '../services/get-tenant.service';

@ApiTags('Superadmin Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/superadmin/system/tenants')
export class GetTenantController {
  constructor(private readonly getTenantService: GetTenantService) {}

  // SLA: FAST
  @Get(':id')
  @ApiOperation({ summary: 'Get a single tenant by id' })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.getTenantService.findOne(id);
  }
}
