import { Controller, Post, Body } from '@nestjs/common';
import { StudentSlotsCreateStudentSlotService } from '../services/student-slots-create-student-slot.service';
import { StudentSlotsCreateStudentSlotDto } from '../dto/student-slots-create-student-slot.dto';

@Controller('v1/admin/student-slots')
export class StudentSlotsCreateStudentSlotController {
  constructor(private readonly service: StudentSlotsCreateStudentSlotService) {}

  @Post()
  async handle(@Body() dto: StudentSlotsCreateStudentSlotDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'StudentSlot created successfully', data };
  }
}
