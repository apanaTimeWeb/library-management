import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { StudentsUpdateService } from '@/modules/manager/students/students/services/students-update.service';
import { UpdateStudentDto } from '@/modules/manager/students/students/dto/update-student.dto';

@ApiTags('Students')
@Controller('api/v1/manager/students')
export class StudentsUpdateController {
  constructor(private readonly service: StudentsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
