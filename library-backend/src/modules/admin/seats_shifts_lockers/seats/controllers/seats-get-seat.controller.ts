import { Controller, Get, Param } from '@nestjs/common';
import { SeatsGetSeatService } from '../services/get-seat.service';

@Controller('api/v1/admin/seats')
export class SeatsGetSeatController {
  constructor(private readonly service: SeatsGetSeatService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Seat retrieved successfully', data };
  }
}
