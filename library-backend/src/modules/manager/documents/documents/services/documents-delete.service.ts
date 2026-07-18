import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '@/core/entities/document.entity';
import { DocumentNotFoundException } from '@/modules/manager/documents/documents/exceptions/documents.exceptions';

@Injectable()
export class DocumentsDeleteService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new DocumentNotFoundException();
    await this.repository.remove(existing);
  }
}
