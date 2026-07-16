import { Controller, Get, Query } from '@nestjs/common';
import { GetAllSeatHistoriesService } from '../services/get-all-seat-history.service';
import { GetSeatHistoriesQueryDto } from '../dto/get-seat-history-query.dto';

@Controller('api/v1/superadmin/seat-history')
export class GetAllSeatHistoriesController {
  constructor(private readonly service: GetAllSeatHistoriesService) {}

  @Get()
  async handle(@Query() query: GetSeatHistoriesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'SeatHistories retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
