import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateUserService } from '../services/update-user.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('api/v1/superadmin/users')
export class UpdateUserController {
  constructor(private readonly service: UpdateUserService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'User updated successfully', data };
  }
}
