import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { SeatsCreateService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-create.service';
import { CreateSeatDto } from '@/modules/manager/seats_shifts_lockers/seats/dto/create-seat.dto';

@ApiTags('Seats')
@Controller('api/v1/manager/seats')
export class SeatsCreateController {
  constructor(private readonly service: SeatsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateSeatDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
