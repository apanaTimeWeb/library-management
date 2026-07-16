import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateStudentService } from '../services/update-student.service';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Controller('api/v1/manager/students')
export class UpdateStudentController {
  constructor(private readonly service: UpdateStudentService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Student updated successfully', data };
  }
}
