import { Controller, Get, Query } from '@nestjs/common';
import { ShiftMigrationsGetAllService } from '../services/shift-migrations-get-all-shift-migrations.service';
import { ShiftMigrationsGetShiftMigrationsQueryDto } from '../dto/shift-migrations-get-shift-migrations-query.dto';

@Controller('v1/admin/shift-migrations')
export class ShiftMigrationsGetAllController {
  constructor(private readonly service: ShiftMigrationsGetAllService) {}

  @Get()
  async handle(@Query() query: ShiftMigrationsGetShiftMigrationsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'ShiftMigrations retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
