import { Controller, Get, Param } from '@nestjs/common';
import { GetComplaintService } from '../services/get-complaint.service';

@Controller('api/v1/manager/complaints')
export class GetComplaintController {
  constructor(private readonly service: GetComplaintService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Complaint retrieved successfully', data };
  }
}
