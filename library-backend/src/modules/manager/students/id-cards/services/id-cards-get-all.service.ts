import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { GetIDCardsQueryDto } from '@/modules/manager/students/id-cards/dto/get-id-cards-query.dto';

@Injectable()
export class IdCardsGetAllService {
  constructor(
    @InjectRepository(IDCard)
    private readonly repository: Repository<IDCard>,
  ) {}

  async execute(queryDto: GetIDCardsQueryDto): Promise<{ items: IDCard[]; total: number }> {
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
