import { Controller, Get, Query } from '@nestjs/common';
import { GetAllUsersService } from '../services/get-all-users.service';
import { GetUsersQueryDto } from '../dto/get-users-query.dto';

@Controller('api/v1/superadmin/users')
export class GetAllUsersController {
  constructor(private readonly service: GetAllUsersService) {}

  @Get()
  async handle(@Query() query: GetUsersQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
