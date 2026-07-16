import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '@/core/entities/document.entity';
import { DocumentNotFoundException } from '../exceptions/documents.exceptions';

@Injectable()
export class GetDocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
  ) {}

  async execute(id: string): Promise<Document> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new DocumentNotFoundException();
    return existing;
  }
}
