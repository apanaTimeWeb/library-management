import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from '@/core/entities/seat.entity';
import { CreateSeatDto } from '@/modules/manager/seats_shifts_lockers/seats/dto/create-seat.dto';

@Injectable()
export class SeatsCreateService {
  constructor(
    @InjectRepository(Seat)
    private readonly repository: Repository<Seat>,
  ) {}

  async execute(dto: CreateSeatDto): Promise<Seat> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
