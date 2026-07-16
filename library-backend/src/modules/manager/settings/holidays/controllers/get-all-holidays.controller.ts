import { Controller, Get, Query } from '@nestjs/common';
import { GetAllHolidaiesService } from '../services/get-all-holidays.service';
import { GetHolidaiesQueryDto } from '../dto/get-holidays-query.dto';

@Controller('api/v1/manager/holidays')
export class GetAllHolidaiesController {
  constructor(private readonly service: GetAllHolidaiesService) {}

  @Get()
  async handle(@Query() query: GetHolidaiesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Holidaies retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
