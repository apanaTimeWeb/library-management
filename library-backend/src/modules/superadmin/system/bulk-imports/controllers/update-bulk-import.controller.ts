import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateBulkImportService } from '../services/update-bulk-import.service';
import { UpdateBulkImportDto } from '../dto/update-bulk-import.dto';

@Controller('api/v1/superadmin/bulk-imports')
export class UpdateBulkImportController {
  constructor(private readonly service: UpdateBulkImportService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateBulkImportDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'BulkImport updated successfully', data };
  }
}
