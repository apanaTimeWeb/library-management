import { Controller, Get, Param } from '@nestjs/common';
import { GetRoleService } from '../services/get-role.service';

@Controller('api/v1/superadmin/roles')
export class GetRoleController {
  constructor(private readonly service: GetRoleService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Role retrieved successfully', data };
  }
}
