import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateStudentSlotService } from '../services/update-student-slot.service';
import { UpdateStudentSlotDto } from '../dto/update-student-slot.dto';

@Controller('api/v1/manager/student-slots')
export class UpdateStudentSlotController {
  constructor(private readonly service: UpdateStudentSlotService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateStudentSlotDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'StudentSlot updated successfully', data };
  }
}
