import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { HolidaysGetAllService } from '@/modules/manager/settings/holidays/services/holidays-get-all.service';
import { GetHolidaiesQueryDto } from '@/modules/manager/settings/holidays/dto/get-holidays-query.dto';

@ApiTags('Holidays')
@Controller('api/v1/manager/holidays')
export class HolidaysGetAllController {
  constructor(private readonly service: HolidaysGetAllService) {}

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
