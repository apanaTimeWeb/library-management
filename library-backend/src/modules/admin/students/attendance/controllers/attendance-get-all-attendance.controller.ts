import { Controller, Get, Query } from '@nestjs/common';
import { AttendanceGetAllAttendancesService } from '../services/attendance-get-all-attendance.service';
import { AttendanceGetAttendancesQueryDto } from '../dto/attendance-get-attendance-query.dto';

@Controller('v1/admin/attendance')
export class AttendanceGetAllAttendancesController {
  constructor(private readonly service: AttendanceGetAllAttendancesService) {}

  @Get()
  async handle(@Query() query: AttendanceGetAttendancesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Attendances retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
