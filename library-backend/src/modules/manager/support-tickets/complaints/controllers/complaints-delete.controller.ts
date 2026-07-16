import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { ComplaintsDeleteService } from '@/modules/manager/support-tickets/complaints/services/complaints-delete.service';

@ApiTags('Complaints')
@Controller('api/v1/manager/complaints')
export class ComplaintsDeleteController {
  constructor(private readonly service: ComplaintsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
