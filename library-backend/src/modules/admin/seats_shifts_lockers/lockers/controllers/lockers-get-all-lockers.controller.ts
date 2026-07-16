import { Controller, Get, Query } from '@nestjs/common';
import { LockersGetAllService } from '../services/get-all-lockers.service';
import { LockersGetLockersQueryDto } from '../dto/get-lockers-query.dto';

@Controller('v1/admin/lockers')
export class LockersGetAllController {
  constructor(private readonly service: LockersGetAllService) {}

  @Get()
  async handle(@Query() query: LockersGetLockersQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Lockers retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
