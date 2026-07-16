import { Controller, Patch, Param, Body } from '@nestjs/common';
import { StudentSlotsUpdateStudentSlotService } from '../services/student-slots-update-student-slot.service';
import { StudentSlotsUpdateStudentSlotDto } from '../dto/student-slots-update-student-slot.dto';

@Controller('v1/admin/student-slots')
export class StudentSlotsUpdateStudentSlotController {
  constructor(private readonly service: StudentSlotsUpdateStudentSlotService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: StudentSlotsUpdateStudentSlotDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'StudentSlot updated successfully', data };
  }
}
