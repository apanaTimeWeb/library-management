import { Controller, Get, Param } from '@nestjs/common';
import { GetAttendanceService } from '../services/get-attendance.service';

@Controller('api/v1/manager/attendance')
export class GetAttendanceController {
  constructor(private readonly service: GetAttendanceService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Attendance retrieved successfully', data };
  }
}
