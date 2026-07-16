import { Controller, Post, Body } from '@nestjs/common';
import { CreateComplaintService } from '../services/create-complaint.service';
import { CreateComplaintDto } from '../dto/create-complaint.dto';

@Controller('api/v1/manager/complaints')
export class CreateComplaintController {
  constructor(private readonly service: CreateComplaintService) {}

  @Post()
  async handle(@Body() dto: CreateComplaintDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Complaint created successfully', data };
  }
}
