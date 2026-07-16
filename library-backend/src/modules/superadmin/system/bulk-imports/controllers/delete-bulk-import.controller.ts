import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteBulkImportService } from '../services/delete-bulk-import.service';

@Controller('api/v1/superadmin/bulk-imports')
export class DeleteBulkImportController {
  constructor(private readonly service: DeleteBulkImportService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'BulkImport deleted successfully', data: null };
  }
}
