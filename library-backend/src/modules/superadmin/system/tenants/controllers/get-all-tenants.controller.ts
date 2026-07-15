import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { GetAllTenantsService } from '../services/get-all-tenants.service';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Superadmin Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/superadmin/system/tenants')
export class GetAllTenantsController {
  constructor(private readonly getAllTenantsService: GetAllTenantsService) {}

  // SLA: FAST
  @Get()
  @ApiOperation({ summary: 'Get all tenants' })
  async findAll(@Query() query: PaginationDto): Promise<any> {
    return this.getAllTenantsService.findAll(query);
  }
}
