import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { ShiftsGetAllService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-get-all.service';
import { GetShiftsQueryDto } from '@/modules/manager/seats_shifts_lockers/shifts/dto/get-shifts-query.dto';

@ApiTags('Shifts')
@Controller('api/v1/manager/shifts')
export class ShiftsGetAllController {
  constructor(private readonly service: ShiftsGetAllService) {}

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
