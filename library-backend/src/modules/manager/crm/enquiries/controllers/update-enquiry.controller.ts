import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateEnquiryService } from '../services/update-enquiry.service';
import { UpdateEnquiryDto } from '../dto/update-enquiry.dto';

@Controller('api/v1/manager/enquiries')
export class UpdateEnquiryController {
  constructor(private readonly service: UpdateEnquiryService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateEnquiryDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Enquiry updated successfully', data };
  }
}
