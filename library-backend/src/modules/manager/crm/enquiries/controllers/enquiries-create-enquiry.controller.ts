import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { EnquiriesCreateEnquiryService } from '@/modules/manager/crm/enquiries/services/enquiries-create-enquiry.service';
import { CreateEnquiryDto } from '@/modules/manager/crm/enquiries/dto/create-enquiry.dto';

@ApiTags('Enquiries')
@Controller('api/v1/manager/enquiries')
export class EnquiriesCreateEnquiryController {
  constructor(private readonly service: EnquiriesCreateEnquiryService) {}

  @Post()
  async handle(@Body() dto: CreateEnquiryDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
