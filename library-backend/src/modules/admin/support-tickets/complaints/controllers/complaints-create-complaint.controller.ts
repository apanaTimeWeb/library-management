import { Controller, Post, Body } from '@nestjs/common';
import { ComplaintsCreateComplaintService } from '../services/complaints-create-complaint.service';
import { ComplaintsCreateComplaintDto } from '../dto/complaints-create-complaint.dto';

@Controller('v1/admin/complaints')
export class ComplaintsCreateComplaintController {
  constructor(private readonly service: ComplaintsCreateComplaintService) {}

  @Post()
  async handle(@Body() dto: ComplaintsCreateComplaintDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Complaint created successfully', data };
  }
}
