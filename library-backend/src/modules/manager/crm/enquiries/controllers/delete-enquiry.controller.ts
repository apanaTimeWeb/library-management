import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteEnquiryService } from '../services/delete-enquiry.service';

@Controller('api/v1/manager/enquiries')
export class DeleteEnquiryController {
  constructor(private readonly service: DeleteEnquiryService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Enquiry deleted successfully', data: null };
  }
}
