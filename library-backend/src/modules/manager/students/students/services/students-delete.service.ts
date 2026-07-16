import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { StudentNotFoundException } from '@/modules/manager/students/students/exceptions/students.exceptions';

@Injectable()
export class StudentsDeleteService {
  constructor(
    @InjectRepository(Student)
    private readonly repository: Repository<Student>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new StudentNotFoundException();
    await this.repository.remove(existing);
  }
}
