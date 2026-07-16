import { Test, TestingModule } from '@nestjs/testing';
import { StudentsDeleteStudentService } from './delete-student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

describe('DeleteStudentService', () => {
  let service: StudentsDeleteStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsDeleteStudentService, {
          provide: getRepositoryToken(Student), useValue: {
            findOne: jest.fn(), softRemove: jest.fn(), }, }, ],
    }).compile();

    service = module.get<DeleteStudentService>(DeleteStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
