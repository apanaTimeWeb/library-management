import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateTenantService } from '../services/update-tenant.service';
import { UpdateTenantDto } from '../dto/update-tenant.dto';

@Controller('api/v1/superadmin/tenants')
export class UpdateTenantController {
  constructor(private readonly service: UpdateTenantService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Tenant updated successfully', data };
  }
}
