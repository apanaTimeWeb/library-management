import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from '@/core/entities/billing.entity';
import { BillingNotFoundException } from '../exceptions/billing.exceptions';

@Injectable()
export class DeleteBillingService {
  constructor(
    @InjectRepository(Billing)
    private readonly repository: Repository<Billing>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new BillingNotFoundException();
    await this.repository.remove(existing);
  }
}
