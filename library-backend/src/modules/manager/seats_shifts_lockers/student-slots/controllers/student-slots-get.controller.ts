import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { StudentSlotsGetService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-get.service';

@ApiTags('Student-slots')
@Controller('api/v1/manager/student-slots')
export class StudentSlotsGetController {
  constructor(private readonly service: StudentSlotsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
