import { Controller, Post, Body } from '@nestjs/common';
import { CreatePermissionService } from '../services/create-permission.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@Controller('api/v1/superadmin/permissions')
export class CreatePermissionController {
  constructor(private readonly service: CreatePermissionService) {}

  @Post()
  async handle(@Body() dto: CreatePermissionDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Permission created successfully', data };
  }
}
