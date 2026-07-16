import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';
import { CreateStudentSlotDto } from '../dto/create-student-slot.dto';

@Injectable()
export class CreateStudentSlotService {
  constructor(
    @InjectRepository(StudentSlot)
    private readonly repository: Repository<StudentSlot>,
  ) {}

  async execute(dto: CreateStudentSlotDto): Promise<StudentSlot> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
