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
    this.logger.log('Seeding Manager Students...');
    const existingStudent = await this.studentRepository.findOne({
      where: { email: 'manager-seed-student@example.com' },
    });

    if (!existingStudent) {
      const newStudent = this.studentRepository.create({
        name: 'Manager Seed Student',
        email: 'manager-seed-student@example.com',
        phone: '1122334455',
        parentPhone: '5544332211',
        college: 'Test College Manager',
      });
      await this.studentRepository.save(newStudent);
      this.logger.log('Manager Students seeded successfully.');
    } else {
      this.logger.log('Manager Students already seeded. Skipping.');
    }
  }
}
