import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteComplaintService } from '../services/delete-complaint.service';

@Controller('api/v1/manager/complaints')
export class DeleteComplaintController {
  constructor(private readonly service: DeleteComplaintService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Complaint deleted successfully', data: null };
  }
}
