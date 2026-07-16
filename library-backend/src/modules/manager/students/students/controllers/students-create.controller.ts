import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { StudentsCreateService } from '@/modules/manager/students/students/services/students-create.service';
import { CreateStudentDto } from '@/modules/manager/students/students/dto/create-student.dto';

@ApiTags('Students')
@Controller('api/v1/manager/students')
export class StudentsCreateController {
  constructor(private readonly service: StudentsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateStudentDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
