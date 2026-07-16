import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatHistory } from '@/core/entities/seat-history.entity';
import { SeatHistoryNotFoundException } from '../exceptions/seat-history.exceptions';

@Injectable()
export class DeleteSeatHistoryService {
  constructor(
    @InjectRepository(SeatHistory)
    private readonly repository: Repository<SeatHistory>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SeatHistoryNotFoundException();
    await this.repository.remove(existing);
  }
}
