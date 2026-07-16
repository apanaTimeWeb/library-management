import { Test, TestingModule } from '@nestjs/testing';
import { StudentsCreateStudentService } from './create-student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

describe('CreateStudentService', () => {
  let service: StudentsCreateStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsCreateStudentService, {
          provide: getRepositoryToken(Student), useValue: {
            create: jest.fn(), save: jest.fn(), }, }, ],
    }).compile();

    service = module.get<CreateStudentService>(CreateStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
