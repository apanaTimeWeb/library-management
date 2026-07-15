import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { GetUserService } from '../services/get-user.service';
import { User } from '@/core/entities/user.entity';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/admin/staff-users/users')
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  // SLA: FAST
  @Get(':id')
  @ApiOperation({ summary: 'Get a single staff user by ID' })
  // SLA: FAST
  async findOne(@Param('id') id: string): Promise<User> {
    return this.getUserService.findOne(id);
  }
}
