import { Controller, Get, Param } from '@nestjs/common';
import { StudentSlotsGetStudentSlotService } from '../services/get-student-slot.service';

@Controller('v1/admin/student-slots')
export class StudentSlotsGetStudentSlotController {
  constructor(private readonly service: StudentSlotsGetStudentSlotService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'StudentSlot retrieved successfully', data };
  }
}
