import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteTenantService } from '../services/delete-tenant.service';

@Controller('api/v1/superadmin/tenants')
export class DeleteTenantController {
  constructor(private readonly service: DeleteTenantService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Tenant deleted successfully', data: null };
  }
}
