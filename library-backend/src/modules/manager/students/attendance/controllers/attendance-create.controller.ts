import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceCreateService } from '@/modules/manager/students/attendance/services/attendance-create.service';
import { CreateAttendanceDto } from '@/modules/manager/students/attendance/dto/create-attendance.dto';

@ApiTags('Attendance')
@Controller('api/v1/manager/attendance')
export class AttendanceCreateController {
  constructor(private readonly service: AttendanceCreateService) {}

  @Post()
  async handle(@Body() dto: CreateAttendanceDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
