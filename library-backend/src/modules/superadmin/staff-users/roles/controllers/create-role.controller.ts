import { Controller, Post, Body } from '@nestjs/common';
import { CreateRoleService } from '../services/create-role.service';
import { CreateRoleDto } from '../dto/create-role.dto';

@Controller('api/v1/superadmin/roles')
export class CreateRoleController {
  constructor(private readonly service: CreateRoleService) {}

  @Post()
  async handle(@Body() dto: CreateRoleDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Role created successfully', data };
  }
}
