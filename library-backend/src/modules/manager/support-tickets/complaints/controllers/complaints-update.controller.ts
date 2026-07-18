import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ComplaintsUpdateService } from '@/modules/manager/support-tickets/complaints/services/complaints-update.service';
import { UpdateComplaintDto } from '@/modules/manager/support-tickets/complaints/dto/update-complaint.dto';

@ApiTags('Complaints')
@Controller('api/v1/manager/complaints')
export class ComplaintsUpdateController {
  constructor(private readonly service: ComplaintsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateComplaintDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
