import { Controller, Post, Body } from '@nestjs/common';
import { SeatHistoryCreateService } from '../services/create-seat-history.service';
import { SeatHistoryCreateDto } from '../dto/create-seat-history.dto';

@Controller('v1/admin/seat-history')
export class SeatHistoryCreateController {
  constructor(private readonly service: SeatHistoryCreateService) {}

  @Post()
  async handle(@Body() dto: SeatHistoryCreateDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'SeatHistory created successfully', data };
  }
}
