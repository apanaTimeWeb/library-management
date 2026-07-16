import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { SeatsGetAllService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-get-all.service';
import { GetSeatsQueryDto } from '@/modules/manager/seats_shifts_lockers/seats/dto/get-seats-query.dto';

@ApiTags('Seats')
@Controller('api/v1/manager/seats')
export class SeatsGetAllController {
  constructor(private readonly service: SeatsGetAllService) {}

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
