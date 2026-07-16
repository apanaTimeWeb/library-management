import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { ComplaintsGetService } from '@/modules/manager/support-tickets/complaints/services/complaints-get.service';

@ApiTags('Complaints')
@Controller('api/v1/manager/complaints')
export class ComplaintsGetController {
  constructor(private readonly service: ComplaintsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
