import { Controller, Get, Query } from '@nestjs/common';
import { GetAllTenantsService } from '../services/get-all-tenants.service';
import { GetTenantsQueryDto } from '../dto/get-tenants-query.dto';

@Controller('api/v1/superadmin/tenants')
export class GetAllTenantsController {
  constructor(private readonly service: GetAllTenantsService) {}

  @Get()
  async handle(@Query() query: GetTenantsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Tenants retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
