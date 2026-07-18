import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '@/core/entities/shift.entity';
import { UpdateShiftDto } from '@/modules/manager/seats_shifts_lockers/shifts/dto/update-shift.dto';
import { ShiftNotFoundException } from '@/modules/manager/seats_shifts_lockers/shifts/exceptions/shifts.exceptions';

@Injectable()
export class ShiftsUpdateService {
  constructor(
    @InjectRepository(Shift)
    private readonly repository: Repository<Shift>,
  ) {}

  async execute(id: string, dto: UpdateShiftDto): Promise<Shift> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ShiftNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
