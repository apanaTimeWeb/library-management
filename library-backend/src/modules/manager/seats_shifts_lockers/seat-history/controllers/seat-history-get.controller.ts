import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { SeatHistoryGetService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-get.service';

@ApiTags('Seat-history')
@Controller('api/v1/manager/seat-history')
export class SeatHistoryGetController {
  constructor(private readonly service: SeatHistoryGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
