import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateDocumentService } from '../services/update-document.service';
import { UpdateDocumentDto } from '../dto/update-document.dto';

@Controller('api/v1/manager/documents')
export class UpdateDocumentController {
  constructor(private readonly service: UpdateDocumentService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Document updated successfully', data };
  }
}
