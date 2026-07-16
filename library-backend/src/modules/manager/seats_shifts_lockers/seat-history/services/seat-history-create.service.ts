import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatHistory } from '@/core/entities/seat-history.entity';
import { CreateSeatHistoryDto } from '@/modules/manager/seats_shifts_lockers/seat-history/dto/create-seat-history.dto';

@Injectable()
export class SeatHistoryCreateService {
  constructor(
    @InjectRepository(SeatHistory)
    private readonly repository: Repository<SeatHistory>,
  ) {}

  async execute(dto: CreateSeatHistoryDto): Promise<SeatHistory> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
