import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { StudentSlotsUpdateService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-update.service';
import { UpdateStudentSlotDto } from '@/modules/manager/seats_shifts_lockers/student-slots/dto/update-student-slot.dto';

@ApiTags('Student-slots')
@Controller('api/v1/manager/student-slots')
export class StudentSlotsUpdateController {
  constructor(private readonly service: StudentSlotsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateStudentSlotDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
