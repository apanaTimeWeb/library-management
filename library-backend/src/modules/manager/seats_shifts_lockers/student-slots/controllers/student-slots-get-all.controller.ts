import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { StudentSlotsGetAllService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-get-all.service';
import { GetStudentSlotsQueryDto } from '@/modules/manager/seats_shifts_lockers/student-slots/dto/get-student-slots-query.dto';

@ApiTags('Student-slots')
@Controller('api/v1/manager/student-slots')
export class StudentSlotsGetAllController {
  constructor(private readonly service: StudentSlotsGetAllService) {}

  @Get()
  async handle(@Query() query: GetStudentSlotsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'StudentSlots retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
