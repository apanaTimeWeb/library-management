import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { ShiftMigrationsCreateService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-create.service';
import { CreateShiftMigrationDto } from '@/modules/manager/seats_shifts_lockers/shift-migrations/dto/create-shift-migration.dto';

@ApiTags('Shift-migrations')
@Controller('api/v1/manager/shift-migrations')
export class ShiftMigrationsCreateController {
  constructor(private readonly service: ShiftMigrationsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateShiftMigrationDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
