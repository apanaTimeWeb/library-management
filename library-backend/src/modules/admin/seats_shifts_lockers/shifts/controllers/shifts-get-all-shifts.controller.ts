import { Controller, Get, Query } from '@nestjs/common';
import { ShiftsGetAllService } from '../services/shifts-get-all-shifts.service';
import { ShiftsGetShiftsQueryDto } from '../dto/shifts-get-shifts-query.dto';

@Controller('v1/admin/shifts')
export class ShiftsGetAllController {
  constructor(private readonly service: ShiftsGetAllService) {}

  @Get()
  async handle(@Query() query: ShiftsGetShiftsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Shifts retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
