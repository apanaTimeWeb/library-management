import { Controller, Post, Body } from '@nestjs/common';
import { CreateEnquiryService } from '../services/create-enquiry.service';
import { CreateEnquiryDto } from '../dto/create-enquiry.dto';

@Controller('api/v1/manager/enquiries')
export class CreateEnquiryController {
  constructor(private readonly service: CreateEnquiryService) {}

  @Post()
  async handle(@Body() dto: CreateEnquiryDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Enquiry created successfully', data };
  }
}
