import { Test, TestingModule } from '@nestjs/testing';
import { GetAllStudentsService } from './get-all-students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

describe('GetAllStudentsService', () => {
  let service: GetAllStudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllStudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue([[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<GetAllStudentsService>(GetAllStudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
