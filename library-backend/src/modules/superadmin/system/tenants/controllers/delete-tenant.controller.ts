import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { DeleteTenantService } from '../services/delete-tenant.service';

@ApiTags('Superadmin Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/superadmin/system/tenants')
export class DeleteTenantController {
  constructor(private readonly deleteTenantService: DeleteTenantService) {}

  // SLA: FAST
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a tenant' })
  async delete(@Param('id') id: string): Promise<any> {
    return this.deleteTenantService.delete(id);
  }
}
