import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { DocumentsGetService } from '@/modules/manager/documents/documents/services/documents-get.service';

@ApiTags('Documents')
@Controller('api/v1/manager/documents')
export class DocumentsGetController {
  constructor(private readonly service: DocumentsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
