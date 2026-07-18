import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { EnquiriesUpdateEnquiryService } from '@/modules/manager/crm/enquiries/services/enquiries-update-enquiry.service';
import { UpdateEnquiryDto } from '@/modules/manager/crm/enquiries/dto/update-enquiry.dto';

@ApiTags('Enquiries')
@Controller('api/v1/manager/enquiries')
export class EnquiriesUpdateEnquiryController {
  constructor(private readonly service: EnquiriesUpdateEnquiryService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateEnquiryDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
