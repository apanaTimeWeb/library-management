import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '@/core/entities/subscription.entity';
import { SubscriptionsCreateSubscriptionDto } from '../dto/subscriptions-create-subscription.dto';

@Injectable()
export class SubscriptionsCreateSubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: Repository<Subscription>,
  ) {}

  async execute(dto: SubscriptionsCreateSubscriptionDto): Promise<Subscription> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
