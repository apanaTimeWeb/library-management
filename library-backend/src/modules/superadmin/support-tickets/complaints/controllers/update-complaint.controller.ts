import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateComplaintService } from '../services/update-complaint.service';
import { UpdateComplaintDto } from '../dto/update-complaint.dto';

@Controller('api/v1/superadmin/complaints')
export class UpdateComplaintController {
  constructor(private readonly service: UpdateComplaintService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateComplaintDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Complaint updated successfully', data };
  }
}
