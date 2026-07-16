import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '@/core/entities/shift.entity';
import { UpdateShiftDto } from '../dto/update-shift.dto';
import { ShiftNotFoundException } from '../exceptions/shifts.exceptions';

@Injectable()
export class UpdateShiftService {
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
