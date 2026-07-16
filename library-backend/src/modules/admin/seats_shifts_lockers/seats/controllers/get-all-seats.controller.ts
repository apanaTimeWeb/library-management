import { Controller, Get, Query } from '@nestjs/common';
import { GetAllSeatsService } from '../services/get-all-seats.service';
import { GetSeatsQueryDto } from '../dto/get-seats-query.dto';

@Controller('api/v1/admin/seats')
export class GetAllSeatsController {
  constructor(private readonly service: GetAllSeatsService) {}

  @Get()
  async handle(@Query() query: GetSeatsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Seats retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
