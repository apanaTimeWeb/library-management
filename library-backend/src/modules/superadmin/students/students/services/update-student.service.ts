import { Injectable } from '@nestjs/common';
import { StudentNotFoundException } from '@/modules/superadmin/students/students/exceptions/students.exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { UpdateStudentDto } from '@/modules/superadmin/students/students/dto/update-student.dto';

@Injectable()
export class UpdateStudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async update(
    id: string,
    branchId: string,
    data: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: { id, branch: { id: branchId } },
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
