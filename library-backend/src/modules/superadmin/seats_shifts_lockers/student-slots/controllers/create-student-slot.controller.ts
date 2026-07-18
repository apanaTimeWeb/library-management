import { Controller, Post, Body } from '@nestjs/common';
import { CreateStudentSlotService } from '../services/create-student-slot.service';
import { CreateStudentSlotDto } from '../dto/create-student-slot.dto';

@Controller('api/v1/superadmin/student-slots')
export class CreateStudentSlotController {
  constructor(private readonly service: CreateStudentSlotService) {}

  @Post()
  async handle(@Body() dto: CreateStudentSlotDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'StudentSlot created successfully', data };
  }
}
