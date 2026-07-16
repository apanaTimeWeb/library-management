import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '@/core/entities/document.entity';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { DocumentNotFoundException } from '../exceptions/documents.exceptions';

@Injectable()
export class UpdateDocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
  ) {}

  async execute(id: string, dto: UpdateDocumentDto): Promise<Document> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new DocumentNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
