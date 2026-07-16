import { Controller, Get, Param } from '@nestjs/common';
import { ComplaintsGetComplaintService } from '../services/get-complaint.service';

@Controller('v1/admin/complaints')
export class ComplaintsGetComplaintController {
  constructor(private readonly service: ComplaintsGetComplaintService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Complaint retrieved successfully', data };
  }
}
