import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { DeleteUserService } from '../services/delete-user.service';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/admin/staff-users/users')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a staff user' })
  // SLA: FAST
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteUserService.delete(id);
  }
}
