import { Controller, Get, Param } from '@nestjs/common';
import { GetShiftMigrationService } from '../services/get-shift-migration.service';

@Controller('api/v1/superadmin/shift-migrations')
export class GetShiftMigrationController {
  constructor(private readonly service: GetShiftMigrationService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'ShiftMigration retrieved successfully', data };
  }
}
