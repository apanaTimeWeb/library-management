import { Controller, Get, Query } from '@nestjs/common';
import { GetAllStudentSlotsService } from '../services/get-all-student-slots.service';
import { GetStudentSlotsQueryDto } from '../dto/get-student-slots-query.dto';

@Controller('api/v1/superadmin/student-slots')
export class GetAllStudentSlotsController {
  constructor(private readonly service: GetAllStudentSlotsService) {}

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
