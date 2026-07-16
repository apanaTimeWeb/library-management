import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { StudentsDeleteService } from '@/modules/manager/students/students/services/students-delete.service';

@ApiTags('Students')
@Controller('api/v1/manager/students')
export class StudentsDeleteController {
  constructor(private readonly service: StudentsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
