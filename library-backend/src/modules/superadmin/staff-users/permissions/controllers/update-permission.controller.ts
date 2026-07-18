import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdatePermissionService } from '../services/update-permission.service';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Controller('api/v1/superadmin/permissions')
export class UpdatePermissionController {
  constructor(private readonly service: UpdatePermissionService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Permission updated successfully', data };
  }
}
