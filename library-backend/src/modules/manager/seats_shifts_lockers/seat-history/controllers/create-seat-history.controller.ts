import { Controller, Post, Body } from '@nestjs/common';
import { CreateSeatHistoryService } from '../services/create-seat-history.service';
import { CreateSeatHistoryDto } from '../dto/create-seat-history.dto';

@Controller('api/v1/manager/seat-history')
export class CreateSeatHistoryController {
  constructor(private readonly service: CreateSeatHistoryService) {}

  @Post()
  async handle(@Body() dto: CreateSeatHistoryDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'SeatHistory created successfully', data };
  }
}
