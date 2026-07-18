import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteRoleService } from '../services/delete-role.service';

@Controller('api/v1/superadmin/roles')
export class DeleteRoleController {
  constructor(private readonly service: DeleteRoleService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Role deleted successfully', data: null };
  }
}
