import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { ShiftMigrationsDeleteService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-delete.service';

@ApiTags('Shift-migrations')
@Controller('api/v1/manager/shift-migrations')
export class ShiftMigrationsDeleteController {
  constructor(private readonly service: ShiftMigrationsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
