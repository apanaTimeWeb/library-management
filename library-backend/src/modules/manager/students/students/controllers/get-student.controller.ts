import { Controller, Get, Param } from '@nestjs/common';
import { GetStudentService } from '../services/get-student.service';

@Controller('api/v1/manager/students')
export class GetStudentController {
  constructor(private readonly service: GetStudentService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Student retrieved successfully', data };
  }
}
