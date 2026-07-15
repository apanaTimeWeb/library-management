import { StudentNotFoundException } from '../exceptions/students.exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../../../core/entities/student.entity';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Injectable()
export class UpdateStudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async update(id: string, branchId: string | undefined, data: UpdateStudentDto): Promise<any> {
    const student = await this.studentRepo.findOne({
      where: { id, ...(branchId ? { branch: { id: branchId } } : {}) }
    });
    if (!student) throw new StudentNotFoundException();
    
    if (data.name) student.name = data.name;
    if (data.phone) student.phone = data.phone;
    if (data.parentPhone !== undefined) student.parentPhone = data.parentPhone;
    if (data.email !== undefined) student.email = data.email;
    if (data.college !== undefined) student.college = data.college;
    if (data.status) student.status = data.status;

    await this.studentRepo.save(student);
    return student;
  }
}
