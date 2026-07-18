import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '@/core/entities/subscription.entity';
import { SubscriptionNotFoundException } from '../exceptions/subscriptions.exceptions';

@Injectable()
export class SubscriptionsGetSubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: Repository<Subscription>,
  ) {}

  async execute(id: string): Promise<Subscription> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SubscriptionNotFoundException();
    return existing;
  }
}
