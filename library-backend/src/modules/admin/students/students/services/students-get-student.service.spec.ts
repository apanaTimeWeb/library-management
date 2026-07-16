import { Test, TestingModule } from '@nestjs/testing';
import { StudentsGetStudentService } from './get-student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

describe('GetStudentService', () => {
  let service: StudentsGetStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsGetStudentService, {
          provide: getRepositoryToken(Student), useValue: {
            findOne: jest.fn(), }, }, ],
    }).compile();

    service = module.get<GetStudentService>(GetStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
