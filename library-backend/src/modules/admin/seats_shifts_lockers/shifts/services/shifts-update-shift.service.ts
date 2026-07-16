import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '@/core/entities/shift.entity';
import { ShiftsUpdateShiftDto } from '../dto/shifts-update-shift.dto';
import { ShiftNotFoundException } from '../exceptions/shifts.exceptions';

@Injectable()
export class ShiftsUpdateShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly repository: Repository<Shift>,
  ) {}

  async execute(id: string, dto: ShiftsUpdateShiftDto): Promise<Shift> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ShiftNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
