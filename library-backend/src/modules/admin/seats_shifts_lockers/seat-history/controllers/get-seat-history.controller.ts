import { Controller, Get, Param } from '@nestjs/common';
import { GetSeatHistoryService } from '../services/get-seat-history.service';

@Controller('api/v1/admin/seat-history')
export class GetSeatHistoryController {
  constructor(private readonly service: GetSeatHistoryService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'SeatHistory retrieved successfully', data };
  }
}
