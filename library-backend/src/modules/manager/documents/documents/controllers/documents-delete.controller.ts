import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { DocumentsDeleteService } from '@/modules/manager/documents/documents/services/documents-delete.service';

@ApiTags('Documents')
@Controller('api/v1/manager/documents')
export class DocumentsDeleteController {
  constructor(private readonly service: DocumentsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
