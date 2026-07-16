import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateAttendanceService } from '../services/update-attendance.service';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';

@Controller('api/v1/admin/attendance')
export class UpdateAttendanceController {
  constructor(private readonly service: UpdateAttendanceService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Attendance updated successfully', data };
  }
}
