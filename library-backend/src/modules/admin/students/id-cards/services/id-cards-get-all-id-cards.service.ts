import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { IdCardsGetIDCardsQueryDto } from '../dto/id-cards-get-id-cards-query.dto';

@Injectable()
export class IdCardsGetAllIDCardsService {
  constructor(
    @InjectRepository(IDCard)
    private readonly repository: Repository<IDCard>,
  ) {}

  async execute(queryDto: IdCardsGetIDCardsQueryDto): Promise<{ items: IDCard[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<IDCard> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
