import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailySettlement } from '@/core/entities/daily-settlement.entity';
import { UpdateDailySettlementDto } from '../dto/update-daily-settlement.dto';
import { DailySettlementNotFoundException } from '../exceptions/daily-settlements.exceptions';

@Injectable()
export class UpdateDailySettlementService {
  constructor(
    @InjectRepository(DailySettlement)
    private readonly repository: Repository<DailySettlement>,
  ) {}

  async execute(id: string, dto: UpdateDailySettlementDto): Promise<DailySettlement> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new DailySettlementNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
