import { Test, TestingModule } from '@nestjs/testing';
import { CreateStudentService } from './create-student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

describe('CreateStudentService', () => {
  let service: CreateStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateStudentService>(CreateStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
