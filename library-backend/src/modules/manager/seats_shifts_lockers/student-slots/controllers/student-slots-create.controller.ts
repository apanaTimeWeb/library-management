import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { StudentSlotsCreateService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-create.service';
import { CreateStudentSlotDto } from '@/modules/manager/seats_shifts_lockers/student-slots/dto/create-student-slot.dto';

@ApiTags('Student-slots')
@Controller('api/v1/manager/student-slots')
export class StudentSlotsCreateController {
  constructor(private readonly service: StudentSlotsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateStudentSlotDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
