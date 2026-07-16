import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { CreateUserService } from '../services/create-user.service';
import { CreateUserDto } from '../dto/create-user.dto';

import { User } from '@/core/entities/user.entity';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(AuthJwtAuthGuard)
@Controller('api/admin/staff-users/users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  // SLA: FAST
  @Post()
  @ApiOperation({ summary: 'Create a new staff user' })
  // SLA: FAST
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserService.create(createUserDto);
  }
}
