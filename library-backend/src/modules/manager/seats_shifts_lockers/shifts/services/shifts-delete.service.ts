import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '@/core/entities/shift.entity';
import { ShiftNotFoundException } from '@/modules/manager/seats_shifts_lockers/shifts/exceptions/shifts.exceptions';

@Injectable()
export class ShiftsDeleteService {
  constructor(
    @InjectRepository(Shift)
    private readonly repository: Repository<Shift>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ShiftNotFoundException();
    await this.repository.remove(existing);
  }
}
