import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { GetAllTenantsService } from '../services/get-all-tenants.service';

@ApiTags('Superadmin Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/superadmin/system/tenants')
export class GetAllTenantsController {
  constructor(private readonly getAllTenantsService: GetAllTenantsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tenants' })
  async findAll() {
    return this.getAllTenantsService.findAll();
  }
}
