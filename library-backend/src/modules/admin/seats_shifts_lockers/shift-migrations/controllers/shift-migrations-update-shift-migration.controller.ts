import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ShiftMigrationsUpdateShiftMigrationService } from '../services/update-shift-migration.service';
import { ShiftMigrationsUpdateShiftMigrationDto } from '../dto/update-shift-migration.dto';

@Controller('api/v1/admin/shift-migrations')
export class ShiftMigrationsUpdateShiftMigrationController {
  constructor(private readonly service: ShiftMigrationsUpdateShiftMigrationService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: ShiftMigrationsUpdateShiftMigrationDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'ShiftMigration updated successfully', data };
  }
}
