import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../../../core/entities/student.entity';
import { StudentNotFoundException } from '../exceptions/students.exceptions';
import { STUDENT_STATUS } from '../constants/students.constants';
import { DeleteResponse } from '../interfaces/students.interfaces';

@Injectable()
export class DeleteStudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async remove(id: string, branchId: string): Promise<DeleteResponse> {
    const student = await this.studentRepo.findOne({
      where: { id, branch: { id: branchId } }
    });
    
    if (!student) {
      throw new StudentNotFoundException();
    }
    
    student.status = STUDENT_STATUS.SUSPENDED;
    student.exitDate = new Date();
    await this.studentRepo.save(student);
    
    return { message: 'Student suspended successfully' };
  }
}
