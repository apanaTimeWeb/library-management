import { Controller, Get, Query } from '@nestjs/common';
import { GetAllAttendancesService } from '../services/get-all-attendance.service';
import { GetAttendancesQueryDto } from '../dto/get-attendance-query.dto';

@Controller('api/v1/manager/attendance')
export class GetAllAttendancesController {
  constructor(private readonly service: GetAllAttendancesService) {}

  @Get()
  async handle(@Query() query: GetAttendancesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Attendances retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
