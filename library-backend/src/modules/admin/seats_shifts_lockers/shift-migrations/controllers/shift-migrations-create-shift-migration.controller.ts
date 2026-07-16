import { Controller, Post, Body } from '@nestjs/common';
import { ShiftMigrationsCreateShiftMigrationService } from '../services/create-shift-migration.service';
import { ShiftMigrationsCreateShiftMigrationDto } from '../dto/create-shift-migration.dto';

@Controller('api/v1/admin/shift-migrations')
export class ShiftMigrationsCreateShiftMigrationController {
  constructor(private readonly service: ShiftMigrationsCreateShiftMigrationService) {}

  @Post()
  async handle(@Body() dto: ShiftMigrationsCreateShiftMigrationDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'ShiftMigration created successfully', data };
  }
}
