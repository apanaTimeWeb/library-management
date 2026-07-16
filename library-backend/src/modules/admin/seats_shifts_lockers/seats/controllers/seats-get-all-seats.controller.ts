import { Controller, Get, Query } from '@nestjs/common';
import { SeatsGetAllService } from '../services/get-all-seats.service';
import { SeatsGetSeatsQueryDto } from '../dto/get-seats-query.dto';

@Controller('v1/admin/seats')
export class SeatsGetAllController {
  constructor(private readonly service: SeatsGetAllService) {}

  @Get()
  async handle(@Query() query: SeatsGetSeatsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Seats retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
