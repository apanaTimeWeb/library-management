import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { SeatHistoryCreateService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-create.service';
import { CreateSeatHistoryDto } from '@/modules/manager/seats_shifts_lockers/seat-history/dto/create-seat-history.dto';

@ApiTags('Seat-history')
@Controller('api/v1/manager/seat-history')
export class SeatHistoryCreateController {
  constructor(private readonly service: SeatHistoryCreateService) {}

  @Post()
  async handle(@Body() dto: CreateSeatHistoryDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
