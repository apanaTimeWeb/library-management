import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';
import { StudentSlotsCreateStudentSlotDto } from '../dto/create-student-slot.dto';

@Injectable()
export class StudentSlotsCreateStudentSlotService {
  constructor(
    @InjectRepository(StudentSlot)
    private readonly repository: Repository<StudentSlot>,
  ) {}

  async execute(dto: StudentSlotsCreateStudentSlotDto): Promise<StudentSlot> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
