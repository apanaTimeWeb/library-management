import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { DocumentsUpdateService } from '@/modules/manager/documents/documents/services/documents-update.service';
import { UpdateDocumentDto } from '@/modules/manager/documents/documents/dto/update-document.dto';

@ApiTags('Documents')
@Controller('api/v1/manager/documents')
export class DocumentsUpdateController {
  constructor(private readonly service: DocumentsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
