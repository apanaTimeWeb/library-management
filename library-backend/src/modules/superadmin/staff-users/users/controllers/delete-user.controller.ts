import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUserService } from '../services/delete-user.service';

@Controller('api/v1/superadmin/users')
export class DeleteUserController {
  constructor(private readonly service: DeleteUserService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'User deleted successfully', data: null };
  }
}
