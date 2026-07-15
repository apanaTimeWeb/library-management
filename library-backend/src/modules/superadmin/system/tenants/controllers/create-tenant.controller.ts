import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { CreateTenantService } from '../services/create-tenant.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@ApiTags('Superadmin Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/superadmin/system/tenants')
export class CreateTenantController {
  constructor(private readonly createTenantService: CreateTenantService) {}

  // SLA: FAST
  @Post()
  @ApiOperation({ summary: 'Create a new tenant' })
  async create(@Body() createTenantDto: CreateTenantDto): Promise<any> {
    return this.createTenantService.create(createTenantDto);
  }
}
