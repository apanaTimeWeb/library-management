import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '@/core/entities/shift.entity';
import { ShiftsCreateShiftDto } from '../dto/create-shift.dto';

@Injectable()
export class ShiftsCreateShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly repository: Repository<Shift>,
  ) {}

  async execute(dto: ShiftsCreateShiftDto): Promise<Shift> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
