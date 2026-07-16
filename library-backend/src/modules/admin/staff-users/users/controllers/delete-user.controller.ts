import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { DeleteUserService } from '../services/delete-user.service';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(AuthJwtAuthGuard)
@Controller('api/admin/staff-users/users')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  // SLA: FAST
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a staff user' })
  // SLA: FAST
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteUserService.delete(id);
  }
}
