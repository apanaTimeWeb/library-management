import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { AttendanceUpdateService } from '@/modules/manager/students/attendance/services/attendance-update.service';
import { UpdateAttendanceDto } from '@/modules/manager/students/attendance/dto/update-attendance.dto';

@ApiTags('Attendance')
@Controller('api/v1/manager/attendance')
export class AttendanceUpdateController {
  constructor(private readonly service: AttendanceUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
