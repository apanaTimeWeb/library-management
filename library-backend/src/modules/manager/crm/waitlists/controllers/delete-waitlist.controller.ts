import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteWaitlistService } from '../services/delete-waitlist.service';

@Controller('api/v1/manager/waitlists')
export class DeleteWaitlistController {
  constructor(private readonly service: DeleteWaitlistService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Waitlist deleted successfully', data: null };
  }
}
