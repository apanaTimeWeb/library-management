import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateShiftMigrationService } from '../services/update-shift-migration.service';
import { UpdateShiftMigrationDto } from '../dto/update-shift-migration.dto';

@Controller('api/v1/manager/shift-migrations')
export class UpdateShiftMigrationController {
  constructor(private readonly service: UpdateShiftMigrationService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateShiftMigrationDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'ShiftMigration updated successfully', data };
  }
}
