import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '@/core/entities/shift.entity';
import { ShiftNotFoundException } from '../exceptions/shifts.exceptions';

@Injectable()
export class ShiftsGetShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly repository: Repository<Shift>,
  ) {}

  async execute(id: string): Promise<Shift> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ShiftNotFoundException();
    return existing;
  }
}
