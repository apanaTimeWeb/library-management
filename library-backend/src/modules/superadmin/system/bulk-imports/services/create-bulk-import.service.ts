import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulkImport } from '@/core/entities/bulk-import.entity';
import { CreateBulkImportDto } from '../dto/create-bulk-import.dto';

@Injectable()
export class CreateBulkImportService {
  constructor(
    @InjectRepository(BulkImport)
    private readonly repository: Repository<BulkImport>,
  ) {}

  async execute(dto: CreateBulkImportDto): Promise<BulkImport> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
