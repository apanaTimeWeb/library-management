import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { AttendanceDeleteService } from '@/modules/manager/students/attendance/services/attendance-delete.service';

@ApiTags('Attendance')
@Controller('api/v1/manager/attendance')
export class AttendanceDeleteController {
  constructor(private readonly service: AttendanceDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
