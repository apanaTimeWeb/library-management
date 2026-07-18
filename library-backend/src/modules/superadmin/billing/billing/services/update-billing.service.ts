import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from '@/core/entities/billing.entity';
import { UpdateBillingDto } from '../dto/update-billing.dto';
import { BillingNotFoundException } from '../exceptions/billing.exceptions';

@Injectable()
export class UpdateBillingService {
  constructor(
    @InjectRepository(Billing)
    private readonly repository: Repository<Billing>,
  ) {}

  async execute(id: string, dto: UpdateBillingDto): Promise<Billing> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new BillingNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
