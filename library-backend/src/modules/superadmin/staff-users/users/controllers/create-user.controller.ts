import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from '../services/create-user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('api/v1/superadmin/users')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post()
  async handle(@Body() dto: CreateUserDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'User created successfully', data };
  }
}
