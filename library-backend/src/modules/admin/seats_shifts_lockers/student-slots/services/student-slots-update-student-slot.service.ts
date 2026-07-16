import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';
import { StudentSlotsUpdateStudentSlotDto } from '../dto/update-student-slot.dto';
import { StudentSlotNotFoundException } from '../exceptions/student-slots.exceptions';

@Injectable()
export class StudentSlotsUpdateStudentSlotService {
  constructor(
    @InjectRepository(StudentSlot)
    private readonly repository: Repository<StudentSlot>,
  ) {}

  async execute(id: string, dto: StudentSlotsUpdateStudentSlotDto): Promise<StudentSlot> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new StudentSlotNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
