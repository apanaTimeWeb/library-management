import { Controller, Get, Query } from '@nestjs/common';
import { StudentSlotsGetAllService } from '../services/student-slots-get-all-student-slots.service';
import { StudentSlotsGetStudentSlotsQueryDto } from '../dto/student-slots-get-student-slots-query.dto';

@Controller('v1/admin/student-slots')
export class StudentSlotsGetAllController {
  constructor(private readonly service: StudentSlotsGetAllService) {}

  @Get()
  async handle(@Query() query: StudentSlotsGetStudentSlotsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'StudentSlots retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
