import { Controller, Delete, Param } from '@nestjs/common';
import { AttendanceDeleteService } from '../services/delete-attendance.service';

@Controller('v1/admin/attendance')
export class AttendanceDeleteController {
  constructor(private readonly service: AttendanceDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Attendance deleted successfully', data: null };
  }
}
