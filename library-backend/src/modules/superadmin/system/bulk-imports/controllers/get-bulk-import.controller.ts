import { Controller, Get, Param } from '@nestjs/common';
import { GetBulkImportService } from '../services/get-bulk-import.service';

@Controller('api/v1/superadmin/bulk-imports')
export class GetBulkImportController {
  constructor(private readonly service: GetBulkImportService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'BulkImport retrieved successfully', data };
  }
}
