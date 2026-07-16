import { Controller, Get, Query } from '@nestjs/common';
import { GetAllShiftsService } from '../services/get-all-shifts.service';
import { GetShiftsQueryDto } from '../dto/get-shifts-query.dto';

@Controller('api/v1/manager/shifts')
export class GetAllShiftsController {
  constructor(private readonly service: GetAllShiftsService) {}

  @Get()
  async handle(@Query() query: GetShiftsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Shifts retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
