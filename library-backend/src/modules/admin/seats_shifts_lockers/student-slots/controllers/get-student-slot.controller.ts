import { Controller, Get, Param } from '@nestjs/common';
import { GetStudentSlotService } from '../services/get-student-slot.service';

@Controller('api/v1/admin/student-slots')
export class GetStudentSlotController {
  constructor(private readonly service: GetStudentSlotService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'StudentSlot retrieved successfully', data };
  }
}
