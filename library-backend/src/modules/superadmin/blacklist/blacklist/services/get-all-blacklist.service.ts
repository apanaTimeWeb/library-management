import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Blacklist } from '@/core/entities/blacklist.entity';
import { GetBlacklistsQueryDto } from '../dto/get-blacklist-query.dto';

@Injectable()
export class GetAllBlacklistsService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly repository: Repository<Blacklist>,
  ) {}

  async execute(queryDto: GetBlacklistsQueryDto): Promise<{ items: Blacklist[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Blacklist> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
