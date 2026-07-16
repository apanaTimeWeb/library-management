import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceCreateService } from '../services/create-attendance.service';
import { AttendanceCreateDto } from '../dto/create-attendance.dto';

@Controller('api/v1/admin/attendance')
export class AttendanceCreateController {
  constructor(private readonly service: AttendanceCreateService) {}

  @Post()
  async handle(@Body() dto: AttendanceCreateDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Attendance created successfully', data };
  }
}
