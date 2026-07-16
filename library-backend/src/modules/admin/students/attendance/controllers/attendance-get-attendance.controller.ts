import { Controller, Get, Param } from '@nestjs/common';
import { AttendanceGetService } from '../services/get-attendance.service';

@Controller('api/v1/admin/attendance')
export class AttendanceGetController {
  constructor(private readonly service: AttendanceGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Attendance retrieved successfully', data };
  }
}
