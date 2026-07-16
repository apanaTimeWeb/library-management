import { Test, TestingModule } from '@nestjs/testing';
import { StudentsGetStudentController } from './get-student.controller';
import { StudentsGetStudentService } from '../services/get-student.service';

describe('GetStudentController', () => {
  let controller: StudentsGetStudentController;
  let service: StudentsGetStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsGetStudentController],
      providers: [Students{
          provide: StudentsGetStudentService, useValue: {
            findOne: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<GetStudentController>(GetStudentController);
    service = module.get<GetStudentService>(GetStudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
