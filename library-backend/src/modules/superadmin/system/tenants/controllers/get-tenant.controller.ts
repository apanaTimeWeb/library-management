import { Controller, Get, Param } from '@nestjs/common';
import { GetTenantService } from '../services/get-tenant.service';

@Controller('api/v1/superadmin/tenants')
export class GetTenantController {
  constructor(private readonly service: GetTenantService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Tenant retrieved successfully', data };
  }
}
