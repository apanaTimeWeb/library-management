import { Controller, Post, Body } from '@nestjs/common';
import { CreateSeatService } from '../services/create-seat.service';
import { CreateSeatDto } from '../dto/create-seat.dto';

@Controller('api/v1/superadmin/seats')
export class CreateSeatController {
  constructor(private readonly service: CreateSeatService) {}

  @Post()
  async handle(@Body() dto: CreateSeatDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Seat created successfully', data };
  }
}
