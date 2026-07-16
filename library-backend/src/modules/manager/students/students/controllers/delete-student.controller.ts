import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteStudentService } from '../services/delete-student.service';

@Controller('api/v1/manager/students')
export class DeleteStudentController {
  constructor(private readonly service: DeleteStudentService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Student deleted successfully', data: null };
  }
}
