import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulkImport } from '@/core/entities/bulk-import.entity';
import { UpdateBulkImportDto } from '../dto/update-bulk-import.dto';
import { BulkImportNotFoundException } from '../exceptions/bulk-imports.exceptions';

@Injectable()
export class UpdateBulkImportService {
  constructor(
    @InjectRepository(BulkImport)
    private readonly repository: Repository<BulkImport>,
  ) {}

  async execute(id: string, dto: UpdateBulkImportDto): Promise<BulkImport> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new BulkImportNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
