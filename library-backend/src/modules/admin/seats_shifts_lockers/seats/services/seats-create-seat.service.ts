import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from '@/core/entities/seat.entity';
import { SeatsCreateSeatDto } from '../dto/create-seat.dto';

@Injectable()
export class SeatsCreateSeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly repository: Repository<Seat>,
  ) {}

  async execute(dto: SeatsCreateSeatDto): Promise<Seat> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
