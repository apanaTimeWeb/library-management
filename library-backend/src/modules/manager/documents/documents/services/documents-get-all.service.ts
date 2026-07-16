import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Document } from '@/core/entities/document.entity';
import { GetDocumentsQueryDto } from '@/modules/manager/documents/documents/dto/get-documents-query.dto';

@Injectable()
export class DocumentsGetAllService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
  ) {}

  async execute(queryDto: GetDocumentsQueryDto): Promise<{ items: Document[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Document> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
