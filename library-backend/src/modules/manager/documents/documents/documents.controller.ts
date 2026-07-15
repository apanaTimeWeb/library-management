import { Controller } from '@nestjs/common';
import { ManagerDocumentsService } from './documents.service';

@Controller('api/manager/documents')
export class ManagerDocumentsController {
  constructor(private readonly service: ManagerDocumentsService) {}
}
