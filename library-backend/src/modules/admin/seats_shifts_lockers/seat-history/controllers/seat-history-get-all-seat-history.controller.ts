import { Controller, Get, Query } from '@nestjs/common';
import { SeatHistoryGetAllSeatHistoriesService } from '../services/get-all-seat-history.service';
import { SeatHistoryGetSeatHistoriesQueryDto } from '../dto/get-seat-history-query.dto';

@Controller('v1/admin/seat-history')
export class SeatHistoryGetAllSeatHistoriesController {
  constructor(private readonly service: SeatHistoryGetAllSeatHistoriesService) {}

  @Get()
  async handle(@Query() query: SeatHistoryGetSeatHistoriesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'SeatHistories retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
