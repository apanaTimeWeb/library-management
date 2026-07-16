import { Controller, Get, Param } from '@nestjs/common';
import { ShiftMigrationsGetShiftMigrationService } from '../services/shift-migrations-get-shift-migration.service';

@Controller('v1/admin/shift-migrations')
export class ShiftMigrationsGetShiftMigrationController {
  constructor(private readonly service: ShiftMigrationsGetShiftMigrationService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'ShiftMigration retrieved successfully', data };
  }
}
