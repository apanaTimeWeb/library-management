import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { BulkImport } from '@/core/entities/bulk-import.entity';
import { GetBulkImportsQueryDto } from '../dto/get-bulk-imports-query.dto';

@Injectable()
export class GetAllBulkImportsService {
  constructor(
    @InjectRepository(BulkImport)
    private readonly repository: Repository<BulkImport>,
  ) {}

  async execute(queryDto: GetBulkImportsQueryDto): Promise<{ items: BulkImport[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<BulkImport> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
