import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { DocumentsCreateService } from '@/modules/manager/documents/documents/services/documents-create.service';
import { CreateDocumentDto } from '@/modules/manager/documents/documents/dto/create-document.dto';

@ApiTags('Documents')
@Controller('api/v1/manager/documents')
export class DocumentsCreateController {
  constructor(private readonly service: DocumentsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateDocumentDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
