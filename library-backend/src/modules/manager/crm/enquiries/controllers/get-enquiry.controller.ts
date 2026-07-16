import { Controller, Get, Param } from '@nestjs/common';
import { GetEnquiryService } from '../services/get-enquiry.service';

@Controller('api/v1/manager/enquiries')
export class GetEnquiryController {
  constructor(private readonly service: GetEnquiryService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Enquiry retrieved successfully', data };
  }
}
