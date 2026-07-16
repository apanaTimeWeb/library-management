import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { StudentNotFoundException } from '../exceptions/students.exceptions';

@Injectable()
export class UpdateStudentService {
  constructor(
    @InjectRepository(Student)
    private readonly repository: Repository<Student>,
  ) {}

  async execute(id: string, dto: UpdateStudentDto): Promise<Student> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new StudentNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
