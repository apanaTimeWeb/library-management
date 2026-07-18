import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from '@/core/entities/seat.entity';
import { SeatNotFoundException } from '@/modules/manager/seats_shifts_lockers/seats/exceptions/seats.exceptions';

@Injectable()
export class SeatsDeleteService {
  constructor(
    @InjectRepository(Seat)
    private readonly repository: Repository<Seat>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SeatNotFoundException();
    await this.repository.remove(existing);
  }
}
