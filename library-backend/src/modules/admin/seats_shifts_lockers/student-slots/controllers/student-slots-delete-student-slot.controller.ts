import { Controller, Delete, Param } from '@nestjs/common';
import { StudentSlotsDeleteStudentSlotService } from '../services/delete-student-slot.service';

@Controller('api/v1/admin/student-slots')
export class StudentSlotsDeleteStudentSlotController {
  constructor(private readonly service: StudentSlotsDeleteStudentSlotService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'StudentSlot deleted successfully', data: null };
  }
}
