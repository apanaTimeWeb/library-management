import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '@/core/entities/shift.entity';
import { CreateShiftDto } from '../dto/create-shift.dto';

@Injectable()
export class CreateShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly repository: Repository<Shift>,
  ) {}

  async execute(dto: CreateShiftDto): Promise<Shift> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
