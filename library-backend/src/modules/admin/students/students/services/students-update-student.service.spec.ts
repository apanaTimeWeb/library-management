import { Test, TestingModule } from '@nestjs/testing';
import { StudentsUpdateStudentService } from './update-student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

describe('UpdateStudentService', () => {
  let service: StudentsUpdateStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsUpdateStudentService, {
          provide: getRepositoryToken(Student), useValue: {
            findOne: jest.fn(), save: jest.fn(), }, }, ],
    }).compile();

    service = module.get<UpdateStudentService>(UpdateStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
