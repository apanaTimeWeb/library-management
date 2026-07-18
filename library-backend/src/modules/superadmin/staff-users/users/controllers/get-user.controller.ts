import { Controller, Get, Param } from '@nestjs/common';
import { GetUserService } from '../services/get-user.service';

@Controller('api/v1/superadmin/users')
export class GetUserController {
  constructor(private readonly service: GetUserService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'User retrieved successfully', data };
  }
}
