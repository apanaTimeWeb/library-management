import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { SeatHistoryUpdateService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-update.service';
import { UpdateSeatHistoryDto } from '@/modules/manager/seats_shifts_lockers/seat-history/dto/update-seat-history.dto';

@ApiTags('Seat-history')
@Controller('api/v1/manager/seat-history')
export class SeatHistoryUpdateController {
  constructor(private readonly service: SeatHistoryUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateSeatHistoryDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
