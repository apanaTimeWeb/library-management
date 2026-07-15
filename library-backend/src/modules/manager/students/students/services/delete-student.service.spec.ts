import { Test, TestingModule } from '@nestjs/testing';
import { DeleteStudentService } from './delete-student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

describe('DeleteStudentService', () => {
  let service: DeleteStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteStudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            findOne: jest.fn(),
            softRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteStudentService>(DeleteStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
