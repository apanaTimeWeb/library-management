import { Controller, Get, Param } from '@nestjs/common';
import { GetPermissionService } from '../services/get-permission.service';

@Controller('api/v1/superadmin/permissions')
export class GetPermissionController {
  constructor(private readonly service: GetPermissionService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Permission retrieved successfully', data };
  }
}
