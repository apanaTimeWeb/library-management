import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '@/core/entities/document.entity';
import { CreateDocumentDto } from '@/modules/manager/documents/documents/dto/create-document.dto';

@Injectable()
export class DocumentsCreateService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
  ) {}

  async execute(dto: CreateDocumentDto): Promise<Document> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
