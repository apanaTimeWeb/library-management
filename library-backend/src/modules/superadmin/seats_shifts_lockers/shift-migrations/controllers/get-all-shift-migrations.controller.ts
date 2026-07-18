import { Controller, Get, Query } from '@nestjs/common';
import { GetAllShiftMigrationsService } from '../services/get-all-shift-migrations.service';
import { GetShiftMigrationsQueryDto } from '../dto/get-shift-migrations-query.dto';

@Controller('api/v1/superadmin/shift-migrations')
export class GetAllShiftMigrationsController {
  constructor(private readonly service: GetAllShiftMigrationsService) {}

  @Get()
  async handle(@Query() query: GetShiftMigrationsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'ShiftMigrations retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
