import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Library } from '@/core/entities/library.entity';
import { GetLibrariesQueryDto } from '../dto/get-libraries-query.dto';

@Injectable()
export class GetAllLibrariesService {
  constructor(
    @InjectRepository(Library)
    private readonly repository: Repository<Library>,
  ) {}

  async execute(queryDto: GetLibrariesQueryDto): Promise<{ items: Library[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Library> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
