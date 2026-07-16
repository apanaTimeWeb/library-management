import { Controller, Post, Body } from '@nestjs/common';
import { CreateBulkImportService } from '../services/create-bulk-import.service';
import { CreateBulkImportDto } from '../dto/create-bulk-import.dto';

@Controller('api/v1/superadmin/bulk-imports')
export class CreateBulkImportController {
  constructor(private readonly service: CreateBulkImportService) {}

  @Post()
  async handle(@Body() dto: CreateBulkImportDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'BulkImport created successfully', data };
  }
}
