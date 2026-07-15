import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/core/entities/student.entity';

@Injectable()
export class StudentsSeeder {
  private readonly logger = new Logger(StudentsSeeder.name);

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async seed() {
    this.logger.log('Seeding Superadmin Students...');
    const existingStudent = await this.studentRepository.findOne({ where: { email: 'superadmin-seed-student@example.com' } });
    
    if (!existingStudent) {
      const newStudent = this.studentRepository.create({
        name: 'Superadmin Seed Student',
        email: 'superadmin-seed-student@example.com',
        phone: '1112223334',
        parentPhone: '4443332221',
        college: 'Test College Superadmin',
      });
      await this.studentRepository.save(newStudent);
      this.logger.log('Superadmin Students seeded successfully.');
    } else {
      this.logger.log('Superadmin Students already seeded. Skipping.');
    }
  }
}
