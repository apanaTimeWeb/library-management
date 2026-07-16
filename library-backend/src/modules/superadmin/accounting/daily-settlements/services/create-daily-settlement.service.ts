import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailySettlement } from '@/core/entities/daily-settlement.entity';
import { CreateDailySettlementDto } from '../dto/create-daily-settlement.dto';

@Injectable()
export class CreateDailySettlementService {
  constructor(
    @InjectRepository(DailySettlement)
    private readonly repository: Repository<DailySettlement>,
  ) {}

  async execute(dto: CreateDailySettlementDto): Promise<DailySettlement> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
