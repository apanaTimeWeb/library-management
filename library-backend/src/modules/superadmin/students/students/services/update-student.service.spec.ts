import { Test, TestingModule } from '@nestjs/testing';
import { UpdateStudentService } from './update-student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

describe('UpdateStudentService', () => {
  let service: UpdateStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateStudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateStudentService>(UpdateStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
