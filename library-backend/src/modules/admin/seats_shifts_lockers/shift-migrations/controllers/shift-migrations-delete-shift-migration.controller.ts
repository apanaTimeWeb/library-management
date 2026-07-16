import { Controller, Delete, Param } from '@nestjs/common';
import { ShiftMigrationsDeleteShiftMigrationService } from '../services/delete-shift-migration.service';

@Controller('api/v1/admin/shift-migrations')
export class ShiftMigrationsDeleteShiftMigrationController {
  constructor(private readonly service: ShiftMigrationsDeleteShiftMigrationService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'ShiftMigration deleted successfully', data: null };
  }
}
