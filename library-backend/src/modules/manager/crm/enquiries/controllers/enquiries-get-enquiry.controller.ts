import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { EnquiriesGetEnquiryService } from '@/modules/manager/crm/enquiries/services/enquiries-get-enquiry.service';

@ApiTags('Enquiries')
@Controller('api/v1/manager/enquiries')
export class EnquiriesGetEnquiryController {
  constructor(private readonly service: EnquiriesGetEnquiryService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
