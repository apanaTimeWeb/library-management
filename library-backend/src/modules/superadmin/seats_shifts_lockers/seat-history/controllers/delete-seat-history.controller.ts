import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteSeatHistoryService } from '../services/delete-seat-history.service';

@Controller('api/v1/superadmin/seat-history')
export class DeleteSeatHistoryController {
  constructor(private readonly service: DeleteSeatHistoryService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'SeatHistory deleted successfully', data: null };
  }
}
