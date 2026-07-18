import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { DocumentsGetAllService } from '@/modules/manager/documents/documents/services/documents-get-all.service';
import { GetDocumentsQueryDto } from '@/modules/manager/documents/documents/dto/get-documents-query.dto';

@ApiTags('Documents')
@Controller('api/v1/manager/documents')
export class DocumentsGetAllController {
  constructor(private readonly service: DocumentsGetAllService) {}

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
