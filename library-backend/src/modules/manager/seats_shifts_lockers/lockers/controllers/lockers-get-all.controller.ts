import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { LockersGetAllService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-get-all.service';
import { GetLockersQueryDto } from '@/modules/manager/seats_shifts_lockers/lockers/dto/get-lockers-query.dto';

@ApiTags('Lockers')
@Controller('api/v1/manager/lockers')
export class LockersGetAllController {
  constructor(private readonly service: LockersGetAllService) {}

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
