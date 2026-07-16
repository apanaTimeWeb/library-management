import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePermissionService } from '../services/delete-permission.service';

@Controller('api/v1/superadmin/permissions')
export class DeletePermissionController {
  constructor(private readonly service: DeletePermissionService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Permission deleted successfully', data: null };
  }
}
