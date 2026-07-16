import { Controller, Get, Param } from '@nestjs/common';
import { GetDocumentService } from '../services/get-document.service';

@Controller('api/v1/manager/documents')
export class GetDocumentController {
  constructor(private readonly service: GetDocumentService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Document retrieved successfully', data };
  }
}
