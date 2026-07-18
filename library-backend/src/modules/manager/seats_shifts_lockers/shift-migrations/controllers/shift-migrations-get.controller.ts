import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { ShiftMigrationsGetService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-get.service';

@ApiTags('Shift-migrations')
@Controller('api/v1/manager/shift-migrations')
export class ShiftMigrationsGetController {
  constructor(private readonly service: ShiftMigrationsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
