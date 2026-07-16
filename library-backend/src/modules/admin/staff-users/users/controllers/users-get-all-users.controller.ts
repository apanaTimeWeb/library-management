import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { UsersGetAllService } from '../services/get-all-users.service';
import { UsersGetUsersQueryDto } from '../dto/get-users-query.dto';
import { User } from '@/core/entities/user.entity';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(AuthJwtAuthGuard)
@Controller('admin/staff-users/users')
export class UsersGetAllController {
  constructor(private readonly getAllService: UsersGetAllService) {}

  @Get()
  @ApiOperation({ summary: 'Get all staff users' })
  // SLA: FAST
  async findAll(
    @Query() queryDto: UsersGetUsersQueryDto,
  ): Promise<{ items: User[]; total: number }> {
    return this.getAllService.findAll(queryDto);
  }
}
