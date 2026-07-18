import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from '@/modules/manager/documents/documents/dto/create-document.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
