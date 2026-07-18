import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from '@/core/entities/seat.entity';
import { UpdateSeatDto } from '@/modules/manager/seats_shifts_lockers/seats/dto/update-seat.dto';
import { SeatNotFoundException } from '@/modules/manager/seats_shifts_lockers/seats/exceptions/seats.exceptions';

@Injectable()
export class SeatsUpdateService {
  constructor(
    @InjectRepository(Seat)
    private readonly repository: Repository<Seat>,
  ) {}

  async execute(id: string, dto: UpdateSeatDto): Promise<Seat> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SeatNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
