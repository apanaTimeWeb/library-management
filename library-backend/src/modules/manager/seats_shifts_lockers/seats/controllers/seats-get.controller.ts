import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { SeatsGetService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-get.service';

@ApiTags('Seats')
@Controller('api/v1/manager/seats')
export class SeatsGetController {
  constructor(private readonly service: SeatsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
