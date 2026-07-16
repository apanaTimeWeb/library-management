import { Test, TestingModule } from '@nestjs/testing';
import { StudentsGetAllService } from './get-all-students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

describe('GetAllService', () => {
  let service: StudentsGetAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsGetAllService, {
          provide: getRepositoryToken(Student), useValue: {
            findAndCount: jest.fn().mockResolvedValue([[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<GetAllService>(GetAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
