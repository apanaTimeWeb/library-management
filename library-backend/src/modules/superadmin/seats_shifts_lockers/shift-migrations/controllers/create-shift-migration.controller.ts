import { Controller, Post, Body } from '@nestjs/common';
import { CreateShiftMigrationService } from '../services/create-shift-migration.service';
import { CreateShiftMigrationDto } from '../dto/create-shift-migration.dto';

@Controller('api/v1/superadmin/shift-migrations')
export class CreateShiftMigrationController {
  constructor(private readonly service: CreateShiftMigrationService) {}

  @Post()
  async handle(@Body() dto: CreateShiftMigrationDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'ShiftMigration created successfully', data };
  }
}
