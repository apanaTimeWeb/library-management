import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteDocumentService } from '../services/delete-document.service';

@Controller('api/v1/manager/documents')
export class DeleteDocumentController {
  constructor(private readonly service: DeleteDocumentService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Document deleted successfully', data: null };
  }
}
