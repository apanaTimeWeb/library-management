import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ComplaintsUpdateComplaintService } from '../services/update-complaint.service';
import { ComplaintsUpdateComplaintDto } from '../dto/update-complaint.dto';

@Controller('api/v1/admin/complaints')
export class ComplaintsUpdateComplaintController {
  constructor(private readonly service: ComplaintsUpdateComplaintService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: ComplaintsUpdateComplaintDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Complaint updated successfully', data };
  }
}
