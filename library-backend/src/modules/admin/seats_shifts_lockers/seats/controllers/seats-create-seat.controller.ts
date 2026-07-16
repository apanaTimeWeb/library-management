import { Controller, Post, Body } from '@nestjs/common';
import { SeatsCreateSeatService } from '../services/create-seat.service';
import { SeatsCreateSeatDto } from '../dto/create-seat.dto';

@Controller('v1/admin/seats')
export class SeatsCreateSeatController {
  constructor(private readonly service: SeatsCreateSeatService) {}

  @Post()
  async handle(@Body() dto: SeatsCreateSeatDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Seat created successfully', data };
  }
}
