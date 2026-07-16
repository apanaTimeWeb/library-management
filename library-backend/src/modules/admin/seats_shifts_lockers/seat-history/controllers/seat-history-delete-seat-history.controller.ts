import { Controller, Delete, Param } from '@nestjs/common';
import { SeatHistoryDeleteService } from '../services/seat-history-delete-seat-history.service';

@Controller('v1/admin/seat-history')
export class SeatHistoryDeleteController {
  constructor(private readonly service: SeatHistoryDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'SeatHistory deleted successfully', data: null };
  }
}
