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
    this.logger.log('Seeding Students...');
    // Seeder should be deterministic and idempotent (Rule 55)
    const existingStudent = await this.studentRepository.findOne({
      where: { email: 'admin-seed-student@example.com' },
    });

    if (!existingStudent) {
      const newStudent = this.studentRepository.create({
        name: 'Seed Student',
        email: 'admin-seed-student@example.com',
        phone: '1234567890',
        parentPhone: '0987654321',
        college: 'Test College',
        // branchId should ideally be retrieved from the branch seeder
      });
      await this.studentRepository.save(newStudent);
      this.logger.log('Students seeded successfully.');
    } else {
      this.logger.log('Students already seeded. Skipping.');
    }
  }
}
