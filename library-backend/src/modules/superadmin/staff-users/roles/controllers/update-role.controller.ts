import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateRoleService } from '../services/update-role.service';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Controller('api/v1/superadmin/roles')
export class UpdateRoleController {
  constructor(private readonly service: UpdateRoleService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Role updated successfully', data };
  }
}
