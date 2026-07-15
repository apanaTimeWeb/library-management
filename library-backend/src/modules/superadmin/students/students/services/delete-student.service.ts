import { Injectable } from '@nestjs/common';
import { StudentNotFoundException } from '../exceptions/students.exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../../../core/entities/student.entity';

@Injectable()
export class DeleteStudentService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
  ) {}

  async remove(id: string, branchId: string): Promise<{ message: string }> {
    const student = await this.studentRepo.findOne({
      where: { id, branch: { id: branchId } }
    });
    if (!student) throw new StudentNotFoundException();
    
    student.status = 'Suspended';
    student.exitDate = new Date();
    await this.studentRepo.save(student);
    
    return { message: 'Student suspended successfully' };
  }
}
