import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatHistory } from '@/core/entities/seat-history.entity';
import { UpdateSeatHistoryDto } from '@/modules/manager/seats_shifts_lockers/seat-history/dto/update-seat-history.dto';
import { SeatHistoryNotFoundException } from '@/modules/manager/seats_shifts_lockers/seat-history/exceptions/seat-history.exceptions';

@Injectable()
export class SeatHistoryUpdateService {
  constructor(
    @InjectRepository(SeatHistory)
    private readonly repository: Repository<SeatHistory>,
  ) {}

  async execute(id: string, dto: UpdateSeatHistoryDto): Promise<SeatHistory> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SeatHistoryNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
