import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ShiftMigrationsUpdateService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-update.service';
import { UpdateShiftMigrationDto } from '@/modules/manager/seats_shifts_lockers/shift-migrations/dto/update-shift-migration.dto';

@ApiTags('Shift-migrations')
@Controller('api/v1/manager/shift-migrations')
export class ShiftMigrationsUpdateController {
  constructor(private readonly service: ShiftMigrationsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateShiftMigrationDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
