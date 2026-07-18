import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { EnquiriesDeleteEnquiryService } from '@/modules/manager/crm/enquiries/services/enquiries-delete-enquiry.service';

@ApiTags('Enquiries')
@Controller('api/v1/manager/enquiries')
export class EnquiriesDeleteEnquiryController {
  constructor(private readonly service: EnquiriesDeleteEnquiryService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
