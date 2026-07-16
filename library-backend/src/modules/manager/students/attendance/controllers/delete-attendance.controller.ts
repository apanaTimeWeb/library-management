import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteAttendanceService } from '../services/delete-attendance.service';

@Controller('api/v1/manager/attendance')
export class DeleteAttendanceController {
  constructor(private readonly service: DeleteAttendanceService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Attendance deleted successfully', data: null };
  }
}
