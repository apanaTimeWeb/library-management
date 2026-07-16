import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { UsersDeleteUserService } from '../services/delete-user.service';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(AuthJwtAuthGuard)
@Controller('admin/staff-users/users')
export class UsersDeleteUserController {
  constructor(private readonly deleteUserService: UsersDeleteUserService) {}

  // SLA: FAST
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a staff user' })
  // SLA: FAST
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteUserService.delete(id);
  }
}
