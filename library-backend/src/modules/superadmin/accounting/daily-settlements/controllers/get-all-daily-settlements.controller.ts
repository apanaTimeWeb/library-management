import { Controller, Get, Query } from '@nestjs/common';
import { GetAllDailySettlementsService } from '../services/get-all-daily-settlements.service';
import { GetDailySettlementsQueryDto } from '../dto/get-daily-settlements-query.dto';

@Controller('api/v1/superadmin/daily-settlements')
export class GetAllDailySettlementsController {
  constructor(private readonly service: GetAllDailySettlementsService) {}

  @Get()
  async handle(@Query() query: GetDailySettlementsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'DailySettlements retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
