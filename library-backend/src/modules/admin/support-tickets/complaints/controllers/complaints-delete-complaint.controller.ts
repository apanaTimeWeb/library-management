import { Controller, Delete, Param } from '@nestjs/common';
import { ComplaintsDeleteComplaintService } from '../services/delete-complaint.service';

@Controller('v1/admin/complaints')
export class ComplaintsDeleteComplaintController {
  constructor(private readonly service: ComplaintsDeleteComplaintService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Complaint deleted successfully', data: null };
  }
}
