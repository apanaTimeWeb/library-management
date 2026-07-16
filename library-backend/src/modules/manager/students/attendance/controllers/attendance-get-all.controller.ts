import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { AttendanceGetAllService } from '@/modules/manager/students/attendance/services/attendance-get-all.service';
import { GetAttendancesQueryDto } from '@/modules/manager/students/attendance/dto/get-attendance-query.dto';

@ApiTags('Attendance')
@Controller('api/v1/manager/attendance')
export class AttendanceGetAllController {
  constructor(private readonly service: AttendanceGetAllService) {}

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
