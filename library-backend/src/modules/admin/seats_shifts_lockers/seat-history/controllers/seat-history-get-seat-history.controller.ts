import { Controller, Get, Param } from '@nestjs/common';
import { SeatHistoryGetService } from '../services/get-seat-history.service';

@Controller('v1/admin/seat-history')
export class SeatHistoryGetController {
  constructor(private readonly service: SeatHistoryGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'SeatHistory retrieved successfully', data };
  }
}
