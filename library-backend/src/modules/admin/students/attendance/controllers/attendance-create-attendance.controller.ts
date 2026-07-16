import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceCreateService } from '../services/attendance-create-attendance.service';
import { AttendanceCreateDto } from '../dto/attendance-create-attendance.dto';

@Controller('v1/admin/attendance')
export class AttendanceCreateController {
  constructor(private readonly service: AttendanceCreateService) {}

  @Post()
  async handle(@Body() dto: AttendanceCreateDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Attendance created successfully', data };
  }
}
