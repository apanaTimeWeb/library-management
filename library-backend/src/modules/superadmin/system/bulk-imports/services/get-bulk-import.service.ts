import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulkImport } from '@/core/entities/bulk-import.entity';
import { BulkImportNotFoundException } from '../exceptions/bulk-imports.exceptions';

@Injectable()
export class GetBulkImportService {
  constructor(
    @InjectRepository(BulkImport)
    private readonly repository: Repository<BulkImport>,
  ) {}

  async execute(id: string): Promise<BulkImport> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new BulkImportNotFoundException();
    return existing;
  }
}
