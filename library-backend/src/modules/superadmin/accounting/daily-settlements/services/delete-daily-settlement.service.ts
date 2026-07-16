import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailySettlement } from '@/core/entities/daily-settlement.entity';
import { DailySettlementNotFoundException } from '../exceptions/daily-settlements.exceptions';

@Injectable()
export class DeleteDailySettlementService {
  constructor(
    @InjectRepository(DailySettlement)
    private readonly repository: Repository<DailySettlement>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new DailySettlementNotFoundException();
    await this.repository.remove(existing);
  }
}
