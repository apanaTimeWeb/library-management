import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';
import { UpdateStudentSlotDto } from '@/modules/manager/seats_shifts_lockers/student-slots/dto/update-student-slot.dto';
import { StudentSlotNotFoundException } from '@/modules/manager/seats_shifts_lockers/student-slots/exceptions/student-slots.exceptions';

@Injectable()
export class StudentSlotsUpdateService {
  constructor(
    @InjectRepository(StudentSlot)
    private readonly repository: Repository<StudentSlot>,
  ) {}

  async execute(id: string, dto: UpdateStudentSlotDto): Promise<StudentSlot> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new StudentSlotNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
