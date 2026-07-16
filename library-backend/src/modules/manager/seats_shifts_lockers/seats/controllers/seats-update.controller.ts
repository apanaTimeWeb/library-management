import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { SeatsUpdateService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-update.service';
import { UpdateSeatDto } from '@/modules/manager/seats_shifts_lockers/seats/dto/update-seat.dto';

@ApiTags('Seats')
@Controller('api/v1/manager/seats')
export class SeatsUpdateController {
  constructor(private readonly service: SeatsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateSeatDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
