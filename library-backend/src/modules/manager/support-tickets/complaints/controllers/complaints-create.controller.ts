import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { ComplaintsCreateService } from '@/modules/manager/support-tickets/complaints/services/complaints-create.service';
import { CreateComplaintDto } from '@/modules/manager/support-tickets/complaints/dto/create-complaint.dto';

@ApiTags('Complaints')
@Controller('api/v1/manager/complaints')
export class ComplaintsCreateController {
  constructor(private readonly service: ComplaintsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateComplaintDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
