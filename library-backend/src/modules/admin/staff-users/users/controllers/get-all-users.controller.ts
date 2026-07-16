import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { GetAllUsersService } from '../services/get-all-users.service';
import { GetUsersQueryDto } from '../dto/get-users-query.dto';
import { User } from '@/core/entities/user.entity';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(AuthJwtAuthGuard)
@Controller('api/admin/staff-users/users')
export class GetAllUsersController {
  constructor(private readonly getAllUsersService: GetAllUsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all staff users' })
  // SLA: FAST
  async findAll(
    @Query() queryDto: GetUsersQueryDto,
  ): Promise<{ items: User[]; total: number }> {
    return this.getAllUsersService.findAll(queryDto);
  }
}
