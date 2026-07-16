import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { SeatHistoryDeleteService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-delete.service';

@ApiTags('Seat-history')
@Controller('api/v1/manager/seat-history')
export class SeatHistoryDeleteController {
  constructor(private readonly service: SeatHistoryDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
