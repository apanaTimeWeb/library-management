import { Controller, Get, Query } from '@nestjs/common';
import { GetAllLockersService } from '../services/get-all-lockers.service';
import { GetLockersQueryDto } from '../dto/get-lockers-query.dto';

@Controller('api/v1/admin/lockers')
export class GetAllLockersController {
  constructor(private readonly service: GetAllLockersService) {}

  @Get()
  async handle(@Query() query: GetLockersQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Lockers retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
