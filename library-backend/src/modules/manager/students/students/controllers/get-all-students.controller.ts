import { Controller, Get, Query } from '@nestjs/common';
import { GetAllStudentsService } from '../services/get-all-students.service';
import { GetStudentsQueryDto } from '../dto/get-students-query.dto';

@Controller('api/v1/manager/students')
export class GetAllStudentsController {
  constructor(private readonly service: GetAllStudentsService) {}

  @Get()
  async handle(@Query() query: GetStudentsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Students retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
