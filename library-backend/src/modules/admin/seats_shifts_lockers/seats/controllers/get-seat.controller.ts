import { Controller, Get, Param } from '@nestjs/common';
import { GetSeatService } from '../services/get-seat.service';

@Controller('api/v1/admin/seats')
export class GetSeatController {
  constructor(private readonly service: GetSeatService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Seat retrieved successfully', data };
  }
}
