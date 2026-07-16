import { Controller, Post, Body } from '@nestjs/common';
import { CreateAttendanceService } from '../services/create-attendance.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';

@Controller('api/v1/admin/attendance')
export class CreateAttendanceController {
  constructor(private readonly service: CreateAttendanceService) {}

  @Post()
  async handle(@Body() dto: CreateAttendanceDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Attendance created successfully', data };
  }
}
