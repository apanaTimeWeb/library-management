import { Controller, Get, Query } from '@nestjs/common';
import { GetAllDocumentsService } from '../services/get-all-documents.service';
import { GetDocumentsQueryDto } from '../dto/get-documents-query.dto';

@Controller('api/v1/manager/documents')
export class GetAllDocumentsController {
  constructor(private readonly service: GetAllDocumentsService) {}

  @Get()
  async handle(@Query() query: GetDocumentsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Documents retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
