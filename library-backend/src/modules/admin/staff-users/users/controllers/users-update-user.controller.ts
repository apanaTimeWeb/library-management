import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { UsersUpdateUserService } from '../services/update-user.service';
import { UsersUpdateUserDto } from '../dto/update-user.dto';
import { User } from '@/core/entities/user.entity';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(AuthJwtAuthGuard)
@Controller('api/admin/staff-users/users')
export class UsersUpdateUserController {
  constructor(private readonly updateUserService: UsersUpdateUserService) {}

  // SLA: FAST
  @Patch(':id')
  @ApiOperation({ summary: 'Update a staff user' })
  // SLA: FAST
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UsersUpdateUserDto,
  ): Promise<User> {
    return this.updateUserService.update(id, updateUserDto);
  }
}
