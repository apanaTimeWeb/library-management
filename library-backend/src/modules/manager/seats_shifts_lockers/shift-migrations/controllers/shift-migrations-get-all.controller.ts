import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { ShiftMigrationsGetAllService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-get-all.service';
import { GetShiftMigrationsQueryDto } from '@/modules/manager/seats_shifts_lockers/shift-migrations/dto/get-shift-migrations-query.dto';

@ApiTags('Shift-migrations')
@Controller('api/v1/manager/shift-migrations')
export class ShiftMigrationsGetAllController {
  constructor(private readonly service: ShiftMigrationsGetAllService) {}

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
