import { Controller, Post, Body } from '@nestjs/common';
import { CreateDocumentService } from '../services/create-document.service';
import { CreateDocumentDto } from '../dto/create-document.dto';

@Controller('api/v1/manager/documents')
export class CreateDocumentController {
  constructor(private readonly service: CreateDocumentService) {}

  @Post()
  async handle(@Body() dto: CreateDocumentDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Document created successfully', data };
  }
}
