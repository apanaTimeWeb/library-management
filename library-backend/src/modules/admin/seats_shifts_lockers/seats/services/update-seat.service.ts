import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from '@/core/entities/seat.entity';
import { UpdateSeatDto } from '../dto/update-seat.dto';
import { SeatNotFoundException } from '../exceptions/seats.exceptions';

@Injectable()
export class UpdateSeatService {
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
