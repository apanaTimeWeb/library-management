import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { StudentsGetService } from '@/modules/manager/students/students/services/students-get.service';

@ApiTags('Students')
@Controller('api/v1/manager/students')
export class StudentsGetController {
  constructor(private readonly service: StudentsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
