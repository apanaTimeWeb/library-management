import { Controller, Patch, Param, Body } from '@nestjs/common';
import { AttendanceUpdateService } from '../services/update-attendance.service';
import { AttendanceUpdateDto } from '../dto/update-attendance.dto';

@Controller('api/v1/admin/attendance')
export class AttendanceUpdateController {
  constructor(private readonly service: AttendanceUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: AttendanceUpdateDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Attendance updated successfully', data };
  }
}
