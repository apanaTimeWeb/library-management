import { Controller, Get, Query } from '@nestjs/common';
import { GetAllBulkImportsService } from '../services/get-all-bulk-imports.service';
import { GetBulkImportsQueryDto } from '../dto/get-bulk-imports-query.dto';

@Controller('api/v1/superadmin/bulk-imports')
export class GetAllBulkImportsController {
  constructor(private readonly service: GetAllBulkImportsService) {}

  @Get()
  async handle(@Query() query: GetBulkImportsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'BulkImports retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
