import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { StudentSlotsDeleteService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-delete.service';

@ApiTags('Student-slots')
@Controller('api/v1/manager/student-slots')
export class StudentSlotsDeleteController {
  constructor(private readonly service: StudentSlotsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
