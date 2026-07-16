import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteStudentSlotService } from '../services/delete-student-slot.service';

@Controller('api/v1/manager/student-slots')
export class DeleteStudentSlotController {
  constructor(private readonly service: DeleteStudentSlotService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'StudentSlot deleted successfully', data: null };
  }
}
