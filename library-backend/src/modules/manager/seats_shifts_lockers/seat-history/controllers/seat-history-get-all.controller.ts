import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { SeatHistoryGetAllService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-get-all.service';
import { GetSeatHistoriesQueryDto } from '@/modules/manager/seats_shifts_lockers/seat-history/dto/get-seat-history-query.dto';

@ApiTags('Seat-history')
@Controller('api/v1/manager/seat-history')
export class SeatHistoryGetAllController {
  constructor(private readonly service: SeatHistoryGetAllService) {}

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
