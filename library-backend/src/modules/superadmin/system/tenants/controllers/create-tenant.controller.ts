import { Controller, Post, Body } from '@nestjs/common';
import { CreateTenantService } from '../services/create-tenant.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@Controller('api/v1/superadmin/tenants')
export class CreateTenantController {
  constructor(private readonly service: CreateTenantService) {}

  @Post()
  async handle(@Body() dto: CreateTenantDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Tenant created successfully', data };
  }
}
