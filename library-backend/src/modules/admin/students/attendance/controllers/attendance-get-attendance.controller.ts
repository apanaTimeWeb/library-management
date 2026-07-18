import { Controller, Get, Param } from '@nestjs/common';
import { AttendanceGetService } from '../services/attendance-get-attendance.service';

@Controller('v1/admin/attendance')
export class AttendanceGetController {
  constructor(private readonly service: AttendanceGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Attendance retrieved successfully', data };
  }
}
