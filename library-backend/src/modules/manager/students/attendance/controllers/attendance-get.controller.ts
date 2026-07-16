import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { AttendanceGetService } from '@/modules/manager/students/attendance/services/attendance-get.service';

@ApiTags('Attendance')
@Controller('api/v1/manager/attendance')
export class AttendanceGetController {
  constructor(private readonly service: AttendanceGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
