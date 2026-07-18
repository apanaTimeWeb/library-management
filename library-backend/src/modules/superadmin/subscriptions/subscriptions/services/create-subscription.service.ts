import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '@/core/entities/subscription.entity';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

@Injectable()
export class CreateSubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: Repository<Subscription>,
  ) {}

  async execute(dto: CreateSubscriptionDto): Promise<Subscription> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
