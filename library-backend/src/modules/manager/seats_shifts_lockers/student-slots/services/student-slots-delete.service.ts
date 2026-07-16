import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';
import { StudentSlotNotFoundException } from '@/modules/manager/seats_shifts_lockers/student-slots/exceptions/student-slots.exceptions';

@Injectable()
export class StudentSlotsDeleteService {
  constructor(
    @InjectRepository(StudentSlot)
    private readonly repository: Repository<StudentSlot>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new StudentSlotNotFoundException();
    await this.repository.remove(existing);
  }
}
