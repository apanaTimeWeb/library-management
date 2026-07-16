import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { StudentsGetAllService } from '@/modules/manager/students/students/services/students-get-all.service';
import { GetStudentsQueryDto } from '@/modules/manager/students/students/dto/get-students-query.dto';

@ApiTags('Students')
@Controller('api/v1/manager/students')
export class StudentsGetAllController {
  constructor(private readonly service: StudentsGetAllService) {}

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
