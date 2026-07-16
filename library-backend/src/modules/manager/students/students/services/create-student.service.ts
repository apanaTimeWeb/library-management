import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { CreateStudentDto } from '../dto/create-student.dto';

@Injectable()
export class CreateStudentService {
  constructor(
    @InjectRepository(Student)
    private readonly repository: Repository<Student>,
  ) {}

  async execute(dto: CreateStudentDto): Promise<Student> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
