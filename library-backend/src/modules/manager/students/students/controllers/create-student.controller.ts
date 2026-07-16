import { Controller, Post, Body } from '@nestjs/common';
import { CreateStudentService } from '../services/create-student.service';
import { CreateStudentDto } from '../dto/create-student.dto';

@Controller('api/v1/manager/students')
export class CreateStudentController {
  constructor(private readonly service: CreateStudentService) {}

  @Post()
  async handle(@Body() dto: CreateStudentDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Student created successfully', data };
  }
}
