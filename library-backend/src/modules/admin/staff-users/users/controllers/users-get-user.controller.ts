import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { UsersGetUserService } from '../services/get-user.service';
import { User } from '@/core/entities/user.entity';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(AuthJwtAuthGuard)
@Controller('admin/staff-users/users')
export class UsersGetUserController {
  constructor(private readonly getUserService: UsersGetUserService) {}

  // SLA: FAST
  @Get(':id')
  @ApiOperation({ summary: 'Get a single staff user by ID' })
  // SLA: FAST
  async findOne(@Param('id') id: string): Promise<User> {
    return this.getUserService.findOne(id);
  }
}
