import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '@/core/entities/subscription.entity';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
import { SubscriptionNotFoundException } from '../exceptions/subscriptions.exceptions';

@Injectable()
export class UpdateSubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: Repository<Subscription>,
  ) {}

  async execute(id: string, dto: UpdateSubscriptionDto): Promise<Subscription> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SubscriptionNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
