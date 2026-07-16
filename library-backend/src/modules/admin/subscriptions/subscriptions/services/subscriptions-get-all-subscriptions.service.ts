import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Subscription } from '@/core/entities/subscription.entity';
import { SubscriptionsGetSubscriptionsQueryDto } from '../dto/subscriptions-get-subscriptions-query.dto';

@Injectable()
export class SubscriptionsGetAllService {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: Repository<Subscription>,
  ) {}

  async execute(queryDto: SubscriptionsGetSubscriptionsQueryDto): Promise<{ items: Subscription[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Subscription> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
